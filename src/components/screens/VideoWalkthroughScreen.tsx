import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Upload,
  Play,
  Pause,
  Trash2,
  RefreshCw,
  Copy,
  Check,
  Film,
  FileVideo,
  Clock,
  HardDrive,
  Info,
  Shield,
  UserCheck,
  Eye,
  Link as LinkIcon,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const VideoWalkthroughScreen: React.FC = () => {
  const {
    sharedVideo,
    isSharedVideoLoading,
    isVideoUploading,
    videoUploadProgress,
    uploadErrorMessage,
    uploadSharedVideo,
    uploadSharedVideoFromUrl,
    userRole,
    toggleUserRole,
    setIsDeleteVideoModalOpen,
  } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedOutline, setCopiedOutline] = useState(false);
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [externalUrlInput, setExternalUrlInput] = useState('');
  const [externalTitleInput, setExternalTitleInput] = useState('');

  const videoOutlineText = `2-MINUTE ORBIT VIDEO WALKTHROUGH GUIDE:

0:00–0:20 — The Problem:
20% of world petroleum and petrochemical feedstock passes through the 21-mile Strait of Hormuz. When maritime insurance cancels war risk coverage, continuous-process manufacturers face immediate feedstock starvation without operational visibility.

0:20–0:45 — Who ORBIT Is For:
Designed for Heads of Global Operations and Supply Chain Directors at energy-intensive enterprises (like Nova Industrials) operating continuous crackers and chemical facilities across Europe, Asia, and the Americas.

0:45–1:20 — Scenario Lab Demonstration:
Walk through the core engine: Stress-testing 60 days vs 90 days. Showing how Plant 02 in Singapore exhausts inventory on Day 24. Demonstrating the immediate resilience impact of activating the East-West Petroline pipeline and Atlantic supply options from Bonny Island.

1:20–1:45 — AI + Decision Workflow:
Demonstrating ORBIT Intelligence: Synthesizing "What Changed", "What Breaks First", and options. Transitioning from analysis to governance by formalizing and logging an audited operational decision in the Decision Log.

1:45–2:00 — Why the Product Matters:
"Don't predict the disruption. Prepare for the possibilities." ORBIT shifts companies from chaotic panic to structured, tested, and audited decision-making.`;

  const handleCopyOutline = async () => {
    try {
      await navigator.clipboard.writeText(videoOutlineText);
      setCopiedOutline(true);
      setTimeout(() => setCopiedOutline(false), 2500);
    } catch (err) {
      console.error('Failed to copy outline', err);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (userRole === 'owner') {
      setIsDragging(true);
    }
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (userRole !== 'owner') return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (isValidVideoFile(file)) {
        uploadSharedVideo(file);
      }
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (isValidVideoFile(file)) {
        uploadSharedVideo(file);
      }
    }
  };

  const isValidVideoFile = (file: File) => {
    const validTypes = ['video/mp4', 'video/quicktime', 'video/webm', 'video/x-matroska'];
    return validTypes.includes(file.type) || file.name.match(/\.(mp4|mov|webm)$/i);
  };

  const triggerUploadClick = () => {
    if (userRole === 'owner') {
      fileInputRef.current?.click();
    }
  };

  const togglePlay = () => {
    if (videoPlayerRef.current) {
      if (videoPlayerRef.current.paused) {
        videoPlayerRef.current.play();
        setIsPlaying(true);
      } else {
        videoPlayerRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!externalUrlInput.trim()) return;
    const success = await uploadSharedVideoFromUrl(
      externalUrlInput.trim(),
      externalTitleInput.trim() || 'cloud-walkthrough.mp4'
    );
    if (success) {
      setIsUrlModalOpen(false);
      setExternalUrlInput('');
      setExternalTitleInput('');
    }
  };

  return (
    <div className="space-y-8 pb-14 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60">
              SHARED WORKSPACE RESOURCE
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              · PERSISTENT VIDEO STORAGE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
            Video Walkthrough
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Single shared video for everyone viewing this workspace. Stored on persistent backend storage.
          </p>
        </div>

        {/* Header Right: Role Switcher & Outline Copy */}
        <div className="flex items-center gap-2.5">
          {/* Role Toggle Pill */}
          <div
            onClick={toggleUserRole}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono cursor-pointer hover:border-cyan-500 transition-colors"
            title="Click to toggle between Owner and Viewer mode"
          >
            {userRole === 'owner' ? (
              <>
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-slate-300">Mode:</span>
                <span className="text-cyan-400 font-bold">Owner / Admin</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-300">Mode:</span>
                <span className="text-amber-400 font-bold">Viewer</span>
              </>
            )}
            <span className="text-[10px] text-slate-400 border-l border-slate-800 pl-1.5">
              Switch ⇄
            </span>
          </div>

          <button
            onClick={handleCopyOutline}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer shrink-0"
          >
            {copiedOutline ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-mono">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="font-mono">COPY OUTLINE</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Upload & Preview Area + Video Script Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Drag & Drop Video Player / Uploader (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Shared Workspace Video
              </h2>
            </div>
            
            <div className="flex items-center gap-2 text-[10px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-slate-400">Persistent Storage: Active</span>
            </div>
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".mp4,.mov,.webm,video/mp4,video/quicktime,video/webm"
            onChange={onFileChange}
            className="hidden"
          />

          {/* STATE 1: VIDEO BEING UPLOADED */}
          {isVideoUploading && (
            <div className="p-8 sm:p-12 rounded-xl border border-cyan-500/40 bg-slate-950 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-cyan-950 border border-cyan-500/60 flex items-center justify-center text-cyan-400 animate-pulse">
                <Upload className="w-6 h-6 animate-bounce" />
              </div>

              <div>
                <h3 className="text-base font-bold text-white font-mono">
                  Uploading...
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-sans">
                  Saving video to persistent shared storage for all workspace viewers.
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="w-full max-w-xs space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-cyan-400">
                  <span>Uploading to server</span>
                  <span className="font-bold">{videoUploadProgress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    style={{ width: `${Math.max(5, videoUploadProgress)}%` }}
                    className="h-full bg-cyan-500 transition-all duration-150 rounded-full"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STATE 2: VIDEO AVAILABLE */}
          {!isVideoUploading && sharedVideo && (
            <div className="space-y-4">
              {/* HTML5 Video Player connected to Persistent Stream */}
              <div className="relative rounded-lg overflow-hidden bg-black border border-slate-800 aspect-video flex items-center justify-center group shadow-xl">
                <video
                  ref={videoPlayerRef}
                  src={sharedVideo.streamUrl}
                  controls
                  playsInline
                  className="w-full h-full object-contain"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              </div>

              {/* Video Metadata Card */}
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <FileVideo className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="text-white font-bold truncate">
                      {sharedVideo.fileName}
                    </span>
                  </div>
                  <span className="text-emerald-400 text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/60 shrink-0">
                    Live for Everyone
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <div>
                    <span className="text-slate-500 block text-[10px]">FILE SIZE</span>
                    <span className="text-slate-200">{sharedVideo.fileSizeFormatted}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">DURATION</span>
                    <span className="text-slate-200">~2:00 mins</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">UPLOADED DATE</span>
                    <span className="text-slate-200">{sharedVideo.uploadedAt}</span>
                  </div>
                </div>
              </div>

              {/* Controls bar: Differs based on Owner vs Viewer */}
              {userRole === 'owner' ? (
                /* OWNER CONTROLS */
                <div className="space-y-2 pt-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                    OWNER CONTROLS
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs font-mono transition-colors cursor-pointer"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-4 h-4" />
                          <span>PAUSE</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          <span>PLAY</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={triggerUploadClick}
                      className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold font-mono transition-colors cursor-pointer"
                      title="Upload a new video to replace the current shared video"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>REPLACE VIDEO</span>
                    </button>

                    <button
                      onClick={() => setIsDeleteVideoModalOpen(true)}
                      className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-900/60 text-xs font-semibold font-mono transition-colors cursor-pointer"
                      title="Delete video from shared persistent storage"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>DELETE FOR EVERYONE</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* VIEWER EXPERIENCE */
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Eye className="w-4 h-4 text-amber-400" />
                    <span>Viewing mode: Read-only access to shared walkthrough</span>
                  </div>
                  <button
                    onClick={togglePlay}
                    className="px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors"
                  >
                    {isPlaying ? 'Pause' : 'Play Video'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STATE 3: NO VIDEO / VIDEO DELETED */}
          {!isVideoUploading && !sharedVideo && !isSharedVideoLoading && (
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className={`p-8 sm:p-12 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center ${
                userRole === 'owner' ? 'cursor-pointer' : ''
              } ${
                isDragging
                  ? 'border-cyan-400 bg-cyan-950/20'
                  : 'border-slate-800 bg-slate-950/50'
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400 mb-4">
                <Film className="w-6 h-6" />
              </div>

              <h3 className="text-base font-bold text-white font-mono">
                Your 2-minute walkthrough hasn't been uploaded yet.
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mt-1 mb-5 leading-relaxed font-sans">
                {userRole === 'owner'
                  ? 'Upload your product walkthrough video. It will be stored in persistent storage and shared with everyone viewing this workspace.'
                  : 'The workspace owner has not published the walkthrough video yet. Check back shortly.'}
              </p>

              {userRole === 'owner' ? (
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={triggerUploadClick}
                    className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold font-mono transition-all shadow cursor-pointer flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>UPLOAD VIDEO</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsUrlModalOpen(true)}
                    className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold font-mono transition-all border border-slate-700 cursor-pointer flex items-center gap-2"
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>LINK CLOUD URL</span>
                  </button>
                </div>
              ) : (
                <div className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                  Viewer mode · Awaiting owner video upload
                </div>
              )}

              {userRole === 'owner' && (
                <div className="mt-4 text-[11px] font-mono text-slate-500">
                  Supports .mp4, .mov, .webm (Up to 500 MB)
                </div>
              )}
            </div>
          )}

          {/* Loading state indicator */}
          {isSharedVideoLoading && (
            <div className="p-8 text-center text-xs font-mono text-slate-400 animate-pulse">
              Connecting to shared video storage...
            </div>
          )}

          {/* Error Message banner */}
          {uploadErrorMessage && (
            <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{uploadErrorMessage}</span>
            </div>
          )}

          {/* Shared Storage Persistence Architecture Note */}
          <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[11px] font-mono text-slate-400 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase">
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>PERSISTENCE ARCHITECTURE</span>
            </div>
            <p className="text-slate-300 font-sans leading-relaxed">
              This video is stored in the workspace's server-side storage and streams with HTTP 206 Range Request support. It persists across page reloads, different browsers, and devices for all stakeholders.
            </p>
          </div>
        </div>

        {/* Right: 2-Minute Video Guide Breakdown (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                SUBMISSION STRUCTURE
              </span>
              <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider mt-0.5">
                2-Minute Video Guide
              </h2>
            </div>
            <button
              onClick={handleCopyOutline}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              {copiedOutline ? 'Copied!' : 'Copy Outline'}
            </button>
          </div>

          <div className="space-y-3 font-sans text-xs">
            {/* Timestamp 1 */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between font-mono">
                <span className="text-cyan-400 font-bold">0:00–0:20</span>
                <span className="text-[10px] text-slate-500 uppercase">THE PROBLEM</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Start with the choke point reality: 20% of world petroleum passing through a 21-mile passage. Explain why predictive geopolitical speculation fails, and why continuous manufacturers need decision engines instead of predictions.
              </p>
            </div>

            {/* Timestamp 2 */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between font-mono">
                <span className="text-cyan-400 font-bold">0:20–0:45</span>
                <span className="text-[10px] text-slate-500 uppercase">WHO ORBIT IS FOR</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Introduce Nova Industrials and the persona: Head of Global Operations & Supply Chain. Highlight 4 global manufacturing plants facing immediate inventory depletion and contractual SLA penalties.
              </p>
            </div>

            {/* Timestamp 3 */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between font-mono">
                <span className="text-cyan-400 font-bold">0:45–1:20</span>
                <span className="text-[10px] text-slate-500 uppercase">SCENARIO LAB DEMO</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                The hero feature: Change duration from 60 to 90 days. Point out the Day 24 inventory exhaustion at Plant 02. Toggle the "Alternative Supplier" and "Petroline Pipeline" interventions to show immediate recovery.
              </p>
            </div>

            {/* Timestamp 4 */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between font-mono">
                <span className="text-cyan-400 font-bold">1:20–1:45</span>
                <span className="text-[10px] text-slate-500 uppercase">AI + DECISION WORKFLOW</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Show ORBIT Intelligence answering "What breaks first?" and click [CREATE DECISION] to formalize the Petroline pipeline nomination in the Decision Log with an assigned owner and cost estimate.
              </p>
            </div>

            {/* Timestamp 5 */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between font-mono">
                <span className="text-cyan-400 font-bold">1:45–2:00</span>
                <span className="text-[10px] text-slate-500 uppercase">WHY THE PRODUCT MATTERS</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Conclude with the core mantra: <em>"Don't predict the disruption. Prepare for the possibilities."</em> Close on ORBIT turning catastrophic paralysis into decisive enterprise action.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Cloud URL Upload Modal (Optional helper for CDN / Vercel Blob / S3 streams) */}
      {isUrlModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white font-mono uppercase">
              Connect Persistent Cloud Video Stream
            </h3>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              If your video is hosted on Vercel Blob, AWS S3, Cloudflare R2, or a public CDN, enter the direct URL below to link it permanently to this workspace.
            </p>

            <form onSubmit={handleUrlSubmit} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-slate-300 mb-1">Direct Video URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://.../walkthrough.mp4"
                  value={externalUrlInput}
                  onChange={e => setExternalUrlInput(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Display Title</label>
                <input
                  type="text"
                  placeholder="e.g. ORBIT 2-Minute Walkthrough (Final).mp4"
                  value={externalTitleInput}
                  onChange={e => setExternalTitleInput(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUrlModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg"
                >
                  Save Stream URL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
