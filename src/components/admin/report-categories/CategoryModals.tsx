import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { fetchClient } from '@/lib/apiClient';
import { TreeContext } from './Workspace';
import { useLanguage } from '@/context/LanguageContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddCategoryModal({ isOpen, onClose, onSuccess }: ModalProps) {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [parentId, setParentId] = useState('');
  const [botContent, setBotContent] = useState('');
  const [defaultPriority, setDefaultPriority] = useState('MEDIUM');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  React.useEffect(() => {
    if (isOpen) {
      supabase.from('categories').select('id, name').order('name').then(({ data }) => {
        if (data) setCategories(data);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const { showToast } = React.useContext(TreeContext) || {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const payload: any = { 
      name, 
      is_active: true,
      bot_content: botContent || null,
      default_priority: defaultPriority 
    };
    
    if (parentId) {
      payload.parent_id = parseInt(parentId);
    }
    
    
    try {
      await fetchClient('/admin/categories', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      onSuccess();
      onClose();
      setName('');
      setParentId('');
      setBotContent('');
      setDefaultPriority('MEDIUM');
      if (showToast) showToast(t('categories.added'), 'success');
    } catch (err) {
      console.error(err);
      if (showToast) showToast(t('categories.add_failed'), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-xl shadow-xl z-50 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-[#C3C6D1]">
          <h2 className="text-xl font-bold text-[#1A1C1E]">{t('categories.add')}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#1A1C1E"/>
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-[#43474F] mb-1">{t('categories.name_label')}</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-2 border border-[#C3C6D1] rounded focus:outline-none focus:border-[#0059BB]" placeholder={t('categories.name_label')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#43474F] mb-1">{t('categories.parent_label')}</label>
            <select 
              value={parentId} 
              onChange={e => setParentId(e.target.value)} 
              className="w-full px-4 py-2 border border-[#C3C6D1] rounded focus:outline-none focus:border-[#0059BB] bg-white"
            >
              <option value="">{t('categories.root_option')}</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#43474F] mb-1">{t('categories.priority_label')}</label>
            <p className="text-xs text-slate-500 mb-2">{t('categories.priority_help')}</p>
            <select 
              value={defaultPriority} 
              onChange={e => setDefaultPriority(e.target.value)} 
              className="w-full px-4 py-2 border border-[#C3C6D1] rounded focus:outline-none focus:border-[#0059BB] bg-white"
            >
              <option value="LOW">{t('categories.priority_low')}</option>
              <option value="MEDIUM">{t('categories.priority_medium')}</option>
              <option value="HIGH">{t('categories.priority_high')}</option>
              <option value="CRITICAL">{t('categories.priority_critical')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#43474F] mb-1">{t('categories.tutorial_label')}</label>
            <p className="text-xs text-slate-500 mb-2">{t('categories.tutorial_help')}</p>
            <textarea 
              value={botContent} 
              onChange={e => setBotContent(e.target.value)} 
              className="w-full px-4 py-2 border border-[#C3C6D1] rounded focus:outline-none focus:border-[#0059BB] min-h-[100px]"
              placeholder={t('categories.tutorial_placeholder')}
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-[#43474F] hover:bg-gray-100 rounded transition-colors">{t('categories.cancel')}</button>
            <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-semibold text-white bg-[#001E40] hover:bg-[#00142d] rounded transition-colors disabled:opacity-50">{loading ? t('categories.saving') : t('categories.save')}</button>
          </div>
        </form>
      </div>
    </>
  );
}

export function AddSubcategoryModal({ isOpen, onClose, onSuccess, categoryId }: ModalProps & { categoryId: string | null }) {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [botContent, setBotContent] = useState('');
  const [defaultPriority, setDefaultPriority] = useState('MEDIUM');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const { showToast } = React.useContext(TreeContext) || {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) return;
    setLoading(true);
    
    try {
      await fetchClient('/admin/categories', {
        method: 'POST',
        body: JSON.stringify({ 
          name, 
          parent_id: parseInt(categoryId), 
          is_active: true,
          bot_content: botContent || null,
          default_priority: defaultPriority
        })
      });
      onSuccess();
      onClose();
      setName('');
      setBotContent('');
      setDefaultPriority('MEDIUM');
      if (showToast) showToast(t('categories.sub_added'), 'success');
    } catch (err) {
      console.error(err);
      if (showToast) showToast(t('categories.sub_add_failed'), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-xl shadow-xl z-50 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-[#C3C6D1]">
          <h2 className="text-xl font-bold text-[#1A1C1E]">{t('categories.add_sub')}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#1A1C1E"/>
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-[#43474F] mb-1">{t('categories.sub_name_label')}</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-2 border border-[#C3C6D1] rounded focus:outline-none focus:border-[#0059BB]" />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#43474F] mb-1">{t('categories.priority_label')}</label>
            <p className="text-xs text-slate-500 mb-2">{t('categories.priority_help')}</p>
            <select 
              value={defaultPriority} 
              onChange={e => setDefaultPriority(e.target.value)} 
              className="w-full px-4 py-2 border border-[#C3C6D1] rounded focus:outline-none focus:border-[#0059BB] bg-white"
            >
              <option value="LOW">{t('categories.priority_low')}</option>
              <option value="MEDIUM">{t('categories.priority_medium')}</option>
              <option value="HIGH">{t('categories.priority_high')}</option>
              <option value="CRITICAL">{t('categories.priority_critical')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#43474F] mb-1">{t('categories.tutorial_label')}</label>
            <p className="text-xs text-slate-500 mb-2">{t('categories.tutorial_help')}</p>
            <textarea 
              value={botContent} 
              onChange={e => setBotContent(e.target.value)} 
              className="w-full px-4 py-2 border border-[#C3C6D1] rounded focus:outline-none focus:border-[#0059BB] min-h-[100px]"
              placeholder={t('categories.tutorial_placeholder')}
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-[#43474F] hover:bg-gray-100 rounded transition-colors">{t('categories.cancel')}</button>
            <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-semibold text-white bg-[#001E40] hover:bg-[#00142d] rounded transition-colors disabled:opacity-50">{loading ? t('categories.saving') : t('categories.save')}</button>
          </div>
        </form>
      </div>
    </>
  );
}

export function EditItemModal({ isOpen, onClose, onSuccess, target }: ModalProps & { target: any }) {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [botContent, setBotContent] = useState('');
  const [defaultPriority, setDefaultPriority] = useState('MEDIUM');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (isOpen && target) {
      setName(target.title);
      
      // Fetch full details since target from tree might not have bot_content
      supabase.from('categories').select('*').eq('id', parseInt(target.id)).single()
        .then(({ data }) => {
          if (data) {
            setBotContent(data.bot_content || '');
            setDefaultPriority(data.default_priority || 'MEDIUM');
          }
        });
    }
  }, [isOpen, target]);

  if (!isOpen || !target) return null;

  const { showToast } = React.useContext(TreeContext) || {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const realId = target.id;
    
    try {
      await fetchClient(`/admin/categories/${parseInt(realId)}`, {
        method: 'PUT',
        body: JSON.stringify({
          name, 
          bot_content: botContent || null,
          default_priority: defaultPriority
        })
      });
      onSuccess();
      onClose();
      if (showToast) showToast(t('categories.updated'), 'success');
    } catch (err) {
      console.error(err);
      if (showToast) showToast(t('categories.update_failed'), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-xl shadow-xl z-50 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-[#C3C6D1]">
          <h2 className="text-xl font-bold text-[#1A1C1E]">{t('categories.edit_title').replace('{type}', target.type === 'category' ? t('categories.name_label') : t('categories.sub_name_label'))}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#1A1C1E"/>
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-[#43474F] mb-1">{t('categories.name_label')}</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-2 border border-[#C3C6D1] rounded focus:outline-none focus:border-[#0059BB]" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#43474F] mb-1">{t('categories.priority_label')}</label>
            <p className="text-xs text-slate-500 mb-2">{t('categories.priority_help')}</p>
            <select 
              value={defaultPriority} 
              onChange={e => setDefaultPriority(e.target.value)} 
              className="w-full px-4 py-2 border border-[#C3C6D1] rounded focus:outline-none focus:border-[#0059BB] bg-white"
            >
              <option value="LOW">{t('categories.priority_low')}</option>
              <option value="MEDIUM">{t('categories.priority_medium')}</option>
              <option value="HIGH">{t('categories.priority_high')}</option>
              <option value="CRITICAL">{t('categories.priority_critical')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#43474F] mb-1">{t('categories.tutorial_label')}</label>
            <p className="text-xs text-slate-500 mb-2">{t('categories.tutorial_help')}</p>
            <textarea 
              value={botContent} 
              onChange={e => setBotContent(e.target.value)} 
              className="w-full px-4 py-2 border border-[#C3C6D1] rounded focus:outline-none focus:border-[#0059BB] min-h-[100px]"
              placeholder={t('categories.tutorial_placeholder')}
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-[#43474F] hover:bg-gray-100 rounded transition-colors">{t('categories.cancel')}</button>
            <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-semibold text-white bg-[#001E40] hover:bg-[#00142d] rounded transition-colors disabled:opacity-50">{loading ? t('categories.saving') : t('categories.save')}</button>
          </div>
        </form>
      </div>
    </>
  );
}
