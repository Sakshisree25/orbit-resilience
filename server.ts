import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

// Persistent storage directory for shared walkthrough video
const UPLOAD_DIR = path.resolve(__dirname, 'uploads', 'video');
const META_FILE = path.join(UPLOAD_DIR, 'meta.json');
const PUBLIC_DIR = path.resolve(__dirname, 'public');

// Ensure upload and public directories exist
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Global CORS & Cross-Origin-Resource-Policy headers
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Expose-Headers', '*');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
  next();
});

// Serve /uploads statically with cross-origin headers
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads'), {
  setHeaders: (res) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
  },
}));

// Interface for persistent video metadata
interface SharedVideoMeta {
  id: string;
  fileName: string;
  originalName: string;
  fileSizeFormatted: string;
  sizeBytes: number;
  mimeType: string;
  durationSeconds: number;
  uploadedAt: string;
  uploadedBy: string;
  sourceType: 'file' | 'url';
  externalUrl?: string;
}

function getStoredVideoMeta(): SharedVideoMeta | null {
  try {
    if (fs.existsSync(META_FILE)) {
      const data = fs.readFileSync(META_FILE, 'utf-8');
      const meta = JSON.parse(data) as SharedVideoMeta;
      // If it's a local file, ensure file exists on disk
      if (meta.sourceType === 'file') {
        const filePath = path.join(UPLOAD_DIR, meta.fileName);
        const publicFile = path.join(PUBLIC_DIR, 'orbit-walkthrough.mp4');
        if (!fs.existsSync(filePath) && !fs.existsSync(publicFile)) {
          return null;
        }
      }
      return meta;
    }
  } catch (err) {
    console.error('Error reading video metadata:', err);
  }
  return null;
}

function saveVideoMeta(meta: SharedVideoMeta) {
  fs.writeFileSync(META_FILE, JSON.stringify(meta, null, 2), 'utf-8');
}

function deleteStoredVideo(): boolean {
  try {
    const meta = getStoredVideoMeta();
    if (meta && meta.sourceType === 'file') {
      const filePath = path.join(UPLOAD_DIR, meta.fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      const publicFile = path.join(PUBLIC_DIR, 'orbit-walkthrough.mp4');
      if (fs.existsSync(publicFile)) {
        fs.unlinkSync(publicFile);
      }
    }
    if (fs.existsSync(META_FILE)) {
      fs.unlinkSync(META_FILE);
    }
    return true;
  } catch (err) {
    console.error('Error deleting video:', err);
    return false;
  }
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.mp4';
    cb(null, `orbit-walkthrough${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB max limit
  fileFilter: (_req, file, cb) => {
    const allowed = ['video/mp4', 'video/quicktime', 'video/webm', 'video/x-matroska'];
    if (allowed.includes(file.mimetype) || file.originalname.match(/\.(mp4|mov|webm|mkv)$/i)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid video format. Only MP4, MOV, and WebM are supported.'));
    }
  },
});

app.use(express.json());

// API: Get current active shared video
app.get('/api/video', (_req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  const meta = getStoredVideoMeta();
  if (!meta) {
    return res.json({ hasVideo: false, video: null });
  }

  res.json({
    hasVideo: true,
    video: {
      id: meta.id,
      fileName: meta.originalName,
      fileSizeFormatted: meta.fileSizeFormatted,
      sizeBytes: meta.sizeBytes,
      durationSeconds: meta.durationSeconds,
      uploadedAt: meta.uploadedAt,
      uploadedBy: meta.uploadedBy,
      streamUrl: meta.sourceType === 'url' ? meta.externalUrl : '/api/video/stream',
      fallbackUrl: meta.sourceType === 'url' ? meta.externalUrl : '/orbit-walkthrough.mp4',
      mimeType: meta.mimeType,
      sourceType: meta.sourceType,
    },
  });
});

// API: Upload shared video (Owner only)
app.post('/api/video/upload', upload.single('video'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No video file provided' });
  }

  // Also sync to public directory for direct static serving
  try {
    const publicTarget = path.join(PUBLIC_DIR, 'orbit-walkthrough.mp4');
    fs.copyFileSync(req.file.path, publicTarget);
  } catch (err) {
    console.error('Failed to copy to public folder:', err);
  }

  // Calculate size format
  const sizeMB = (req.file.size / (1024 * 1024)).toFixed(1);
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }) + ` at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  const meta: SharedVideoMeta = {
    id: `vid-${Date.now()}`,
    fileName: req.file.filename,
    originalName: req.file.originalname,
    fileSizeFormatted: `${sizeMB} MB`,
    sizeBytes: req.file.size,
    mimeType: req.file.mimetype || 'video/mp4',
    durationSeconds: 120, // default target 2 minutes
    uploadedAt: dateStr,
    uploadedBy: 'Elena Vance (Head of Global Operations)',
    sourceType: 'file',
  };

  saveVideoMeta(meta);

  res.json({
    success: true,
    video: {
      id: meta.id,
      fileName: meta.originalName,
      fileSizeFormatted: meta.fileSizeFormatted,
      sizeBytes: meta.sizeBytes,
      durationSeconds: meta.durationSeconds,
      uploadedAt: meta.uploadedAt,
      uploadedBy: meta.uploadedBy,
      streamUrl: '/api/video/stream',
      fallbackUrl: '/orbit-walkthrough.mp4',
      mimeType: meta.mimeType,
      sourceType: 'file',
    },
  });
});

// API: Save external cloud video URL (e.g., Vercel Blob / S3 / Cloud Storage / CDN)
app.post('/api/video/url', (req: Request, res: Response) => {
  const { url, title, durationSeconds } = req.body;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Valid URL is required' });
  }

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }) + ` at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  const meta: SharedVideoMeta = {
    id: `vid-${Date.now()}`,
    fileName: 'external-video-stream',
    originalName: title || 'walkthrough-video.mp4',
    fileSizeFormatted: 'Cloud Stream',
    sizeBytes: 0,
    mimeType: 'video/mp4',
    durationSeconds: durationSeconds || 120,
    uploadedAt: dateStr,
    uploadedBy: 'Elena Vance (Head of Global Operations)',
    sourceType: 'url',
    externalUrl: url,
  };

  saveVideoMeta(meta);

  res.json({
    success: true,
    video: {
      id: meta.id,
      fileName: meta.originalName,
      fileSizeFormatted: meta.fileSizeFormatted,
      sizeBytes: meta.sizeBytes,
      durationSeconds: meta.durationSeconds,
      uploadedAt: meta.uploadedAt,
      uploadedBy: meta.uploadedBy,
      streamUrl: url,
      fallbackUrl: url,
      mimeType: 'video/mp4',
      sourceType: 'url',
    },
  });
});

// API: Stream video with HTTP 206 Partial Content (range requests for seeking)
app.get('/api/video/stream', (req: Request, res: Response) => {
  const meta = getStoredVideoMeta();
  if (!meta || meta.sourceType !== 'file') {
    return res.status(404).json({ error: 'No video file available' });
  }

  let filePath = path.join(UPLOAD_DIR, meta.fileName);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(PUBLIC_DIR, 'orbit-walkthrough.mp4');
  }
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Video file not found on disk' });
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  res.setHeader('Accept-Ranges', 'bytes');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10) || 0;
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;

    if (start >= fileSize || end >= fileSize) {
      res.setHeader('Content-Range', `bytes */${fileSize}`);
      return res.status(416).end();
    }

    const file = fs.createReadStream(filePath, { start, end });
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': meta.mimeType || 'video/mp4',
    });
    file.pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': fileSize,
      'Content-Type': meta.mimeType || 'video/mp4',
      'Accept-Ranges': 'bytes',
    });
    fs.createReadStream(filePath).pipe(res);
  }
});

// API: Delete shared video for everyone
app.delete('/api/video', (_req: Request, res: Response) => {
  const success = deleteStoredVideo();
  if (success) {
    res.json({ success: true, message: 'Video deleted for everyone' });
  } else {
    res.status(500).json({ error: 'Failed to delete video' });
  }
});

// Vite middleware or static serving
async function startServer() {
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ORBIT Full-Stack Server running on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
