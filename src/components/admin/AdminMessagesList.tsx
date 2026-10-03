import React, { useState } from 'react';
import { Mail, MessageCircle, Phone, Trash2, CheckCircle2, Clock, Search, RefreshCw, AlertCircle, Building } from 'lucide-react';
import { MessageRecord, updateMessageStatus, deleteMessage } from '../../services/pocketbase';

interface AdminMessagesListProps {
  messages: MessageRecord[];
  onRefresh: () => void;
  loading: boolean;
}

export const AdminMessagesList: React.FC<AdminMessagesListProps> = ({
  messages,
  onRefresh,
  loading,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'unread' | 'read'>('ALL');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const unreadCount = messages.filter((m) => m.status === 'unread').length;

  const filtered = messages.filter((m) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      (m.name || '').toLowerCase().includes(term) ||
      (m.email || '').toLowerCase().includes(term) ||
      (m.phone || '').toLowerCase().includes(term) ||
      (m.message || '').toLowerCase().includes(term) ||
      (m.propertyCode || '').toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === 'ALL' ? true : m.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleToggleStatus = async (msg: MessageRecord) => {
    const nextStatus = msg.status === 'read' ? 'unread' : 'read';
    await updateMessageStatus(msg.id, nextStatus);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await deleteMessage(id);
    setDeletingId(null);
    setConfirmDeleteId(null);
    onRefresh();
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('es-CL', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-[#dfb86c] uppercase tracking-widest block mb-1">
            // BANDEJA DE ENTRADA WEB
          </span>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
              Mensajes y Consultas ({messages.length})
            </h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#dfb86c] text-slate-950 font-mono text-xs font-bold animate-pulse">
                {unreadCount} nuevos
              </span>
            )}
          </div>
        </div>

        <button
          onClick={onRefresh}
          disabled={loading}
          className="px-4 py-2.5 rounded-xl border border-white/15 hover:border-[#dfb86c] bg-white/5 hover:bg-white/10 text-xs font-semibold uppercase text-slate-200 hover:text-white transition-all cursor-pointer flex items-center gap-2 self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#dfb86c]' : ''}`} />
          <span>Actualizar</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#0b1428] border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por remitente, correo, teléfono o propiedad..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white placeholder-slate-500 focus:border-[#dfb86c] outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              statusFilter === 'ALL'
                ? 'bg-[#dfb86c] text-slate-950 font-bold'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            Todos ({messages.length})
          </button>
          <button
            onClick={() => setStatusFilter('unread')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              statusFilter === 'unread'
                ? 'bg-[#dfb86c] text-slate-950 font-bold'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            No Leídos ({unreadCount})
          </button>
          <button
            onClick={() => setStatusFilter('read')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              statusFilter === 'read'
                ? 'bg-[#dfb86c] text-slate-950 font-bold'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            Leídos ({messages.length - unreadCount})
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16 rounded-3xl bg-[#0b1428] border border-white/10 space-y-3">
            <Mail className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-sm text-slate-300 font-semibold">No hay mensajes para mostrar.</p>
            <p className="text-xs text-slate-500">
              Cuando los visitantes envíen formularios desde el sitio web, aparecerán aquí en tiempo real.
            </p>
          </div>
        ) : (
          filtered.map((msg) => {
            const isUnread = msg.status === 'unread';
            const cleanPhone = (msg.phone || '').replace(/[^0-9]/g, '');

            return (
              <div
                key={msg.id}
                className={`p-6 rounded-2xl border transition-all ${
                  isUnread
                    ? 'bg-[#0f1d38] border-[#dfb86c]/50 shadow-lg shadow-black/40'
                    : 'bg-[#0b1428] border-white/10 opacity-90'
                }`}
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isUnread ? 'bg-[#dfb86c] animate-pulse' : 'bg-slate-600'
                      }`}
                    ></span>
                    <h3 className="text-base font-bold text-white uppercase tracking-tight">
                      {msg.name || 'Sin nombre'}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
                      {msg.source === 'publish_form'
                        ? 'Captación de Propiedad'
                        : msg.propertyCode
                        ? `Propiedad ${msg.propertyCode}`
                        : 'Contacto General'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{formatDate(msg.created)}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="py-4 space-y-3">
                  {/* Property Reference if any */}
                  {msg.propertyTitle && (
                    <div className="flex items-center gap-2 text-xs text-[#fae6be] bg-white/5 p-2 rounded-lg">
                      <Building className="w-3.5 h-3.5 text-[#dfb86c]" />
                      <span>
                        Consulta por: <strong>{msg.propertyTitle}</strong> ({msg.propertyCode})
                      </span>
                    </div>
                  )}

                  {msg.subject && (
                    <div className="text-xs font-bold text-slate-200 uppercase">
                      Asunto: {msg.subject}
                    </div>
                  )}

                  <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap bg-slate-900/60 p-4 rounded-xl border border-white/5">
                    {msg.message}
                  </p>
                </div>

                {/* Footer & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-white/10">
                  {/* Contact Info Pills */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                    <a
                      href={`mailto:${msg.email}`}
                      className="flex items-center gap-1.5 hover:text-[#dfb86c] transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#dfb86c]" />
                      <span>{msg.email}</span>
                    </a>

                    {msg.phone && (
                      <a
                        href={`tel:${msg.phone}`}
                        className="flex items-center gap-1.5 hover:text-[#dfb86c] transition-colors font-mono"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#dfb86c]" />
                        <span>{msg.phone}</span>
                      </a>
                    )}
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex items-center gap-2">
                    {/* WhatsApp button */}
                    {cleanPhone && (
                      <a
                        href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                          `Hola ${msg.name}, te contacto desde BANÁ Propiedades en respuesta a tu consulta web.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase flex items-center gap-1.5 transition-colors shadow"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span>WhatsApp</span>
                      </a>
                    )}

                    {/* Toggle read/unread */}
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(msg)}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
                    >
                      {isUnread ? 'Marcar Leído' : 'Marcar No Leído'}
                    </button>

                    {/* Delete */}
                    {confirmDeleteId === msg.id ? (
                      <div className="flex items-center gap-1 bg-red-950 p-1 rounded-lg border border-red-500/50">
                        <button
                          type="button"
                          disabled={deletingId === msg.id}
                          onClick={() => handleDelete(msg.id)}
                          className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold uppercase"
                        >
                          ¿Borrar?
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-1 text-slate-400 text-[10px]"
                        >
                          X
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(msg.id)}
                        className="p-2 rounded-lg border border-white/10 hover:border-red-500 hover:bg-red-500/20 text-slate-400 hover:text-red-300 transition-colors cursor-pointer"
                        title="Eliminar mensaje"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
