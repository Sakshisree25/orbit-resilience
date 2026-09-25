import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export const DeleteVideoModal: React.FC = () => {
  const {
    isDeleteVideoModalOpen,
    setIsDeleteVideoModalOpen,
    deleteSharedVideoForEveryone,
    sharedVideo,
  } = useApp();

  if (!isDeleteVideoModalOpen) return null;

  const handleDelete = async () => {
    await deleteSharedVideoForEveryone();
    setIsDeleteVideoModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden text-slate-100 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2 text-rose-400">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <h3 className="text-sm font-bold text-white font-mono">
              Delete walkthrough video?
            </h3>
          </div>
          <button
            onClick={() => setIsDeleteVideoModalOpen(false)}
            className="p-1 text-slate-400 hover:text-white rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs font-sans">
          <p className="text-slate-300 leading-relaxed">
            Deleting this video will remove it for everyone viewing this workspace.
          </p>

          {sharedVideo && (
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-[11px] text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>File:</span>
                <span className="text-white font-medium truncate max-w-[200px]">{sharedVideo.fileName}</span>
              </div>
              <div className="flex justify-between">
                <span>Size:</span>
                <span className="text-slate-300">{sharedVideo.fileSizeFormatted}</span>
              </div>
              <div className="flex justify-between">
                <span>Uploaded:</span>
                <span className="text-slate-300">{sharedVideo.uploadedAt}</span>
              </div>
            </div>
          )}

          <p className="text-[11px] text-rose-400 font-mono">
            This action deletes the video from persistent storage immediately. Other active viewers will lose access.
          </p>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-end gap-3 font-mono text-xs">
          <button
            onClick={() => setIsDeleteVideoModalOpen(false)}
            className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            CANCEL
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>DELETE FOR EVERYONE</span>
          </button>
        </div>
      </div>
    </div>
  );
};
