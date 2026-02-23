"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Check, Search, Tag, MessageSquareText } from "lucide-react";
import { chatbotApi, KnowledgeBaseEntry, CreateEntryPayload } from "@/lib/api/chatbot";

const EMPTY_FORM: CreateEntryPayload = {
  question: "",
  answer: "",
  category: "",
  keywords: "",
};

export default function ChatbotKnowledgeBasePage() {
  const [entries, setEntries] = useState<KnowledgeBaseEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<KnowledgeBaseEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<KnowledgeBaseEntry | null>(null);
  const [form, setForm] = useState<CreateEntryPayload>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Delete confirm
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await chatbotApi.getAll();
      setEntries(data);
      setFilteredEntries(data);
    } catch {
      setError("Failed to load knowledge base entries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredEntries(entries);
    } else {
      const q = search.toLowerCase();
      setFilteredEntries(
        entries.filter(
          (e) =>
            e.question.toLowerCase().includes(q) ||
            e.answer.toLowerCase().includes(q) ||
            (e.category?.toLowerCase().includes(q) ?? false) ||
            (e.keywords?.toLowerCase().includes(q) ?? false)
        )
      );
    }
  }, [search, entries]);

  const openCreate = () => {
    setEditingEntry(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEdit = (entry: KnowledgeBaseEntry) => {
    setEditingEntry(entry);
    setForm({
      question: entry.question,
      answer: entry.answer,
      category: entry.category ?? "",
      keywords: entry.keywords ?? "",
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEntry(null);
    setForm(EMPTY_FORM);
    setFormError(null);
  };

  const handleSave = async () => {
    if (!form.question.trim() || !form.answer.trim()) {
      setFormError("Question and Answer are required.");
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      const payload: CreateEntryPayload = {
        question: form.question.trim(),
        answer: form.answer.trim(),
        category: form.category?.trim() || undefined,
        keywords: form.keywords?.trim() || undefined,
      };
      if (editingEntry) {
        await chatbotApi.update(editingEntry.id, payload);
      } else {
        await chatbotApi.create(payload);
      }
      await fetchEntries();
      closeModal();
    } catch {
      setFormError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await chatbotApi.delete(id);
      setEntries((prev) => prev.filter((e) => e.id !== id));
      setDeletingId(null);
    } catch {
      setError("Failed to delete entry.");
      setDeletingId(null);
    }
  };

  // Group by category
  const grouped = filteredEntries.reduce<Record<string, KnowledgeBaseEntry[]>>(
    (acc, entry) => {
      const cat = entry.category?.trim() || "General";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(entry);
      return acc;
    },
    {}
  );

  return (
    <div className="p-4 lg:p-8">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div className=" gap-3">
          <div>
            <h1 className="text-3xl font-bold">Job Applications</h1>
          </div>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Entry
        </button>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by question, answer, category or keywords..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-center justify-between">
          {error}
          <button onClick={() => setError(null)}><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-gray-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3" />
          Loading...
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <MessageSquareText className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No entries found</p>
          <p className="text-sm mt-1">
            {search ? "Try a different search term." : "Click 'Add Entry' to get started."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([category, items]) => (
              <div key={category}>
                {/* Category label */}
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-blue-500" />
                  <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                    {category}
                  </h2>
                  <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">
                    {items.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {items.map((entry) => (
                    <div
                      key={entry.id}
                      className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm mb-1.5">
                            Q: {entry.question}
                          </p>
                          <p className="text-gray-600 text-sm leading-relaxed mb-2">
                            A: {entry.answer}
                          </p>
                          {entry.keywords && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {entry.keywords.split(",").map((kw, i) => (
                                <span
                                  key={i}
                                  className="text-xs bg-blue-50 text-blue-600 border border-blue-100 rounded-full px-2 py-0.5"
                                >
                                  {kw.trim()}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => openEdit(entry)}
                            className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          {deletingId === entry.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(entry.id)}
                                className="p-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition-colors"
                                title="Confirm delete"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeletingId(null)}
                                className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
                                title="Cancel"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeletingId(entry.id)}
                              className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Stats bar */}
      {!loading && entries.length > 0 && (
        <div className="mt-6 text-center text-xs text-gray-400">
          {filteredEntries.length} of {entries.length} entries
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingEntry ? "Edit Knowledge Base Entry" : "Add Knowledge Base Entry"}
              </h2>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 space-y-4">
              {formError && (
                <div className="px-3 py-2.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Question <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.question}
                  onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
                  placeholder="e.g. What services do you offer?"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Answer <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={form.answer}
                  onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
                  placeholder="e.g. We offer HVAC, elevator installation, fire protection, and more..."
                  rows={4}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Category
                </label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  placeholder="e.g. Services, Contact, Pricing"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Keywords
                  <span className="text-gray-400 font-normal ml-1">(comma-separated)</span>
                </label>
                <input
                  type="text"
                  value={form.keywords}
                  onChange={(e) => setForm((f) => ({ ...f, keywords: e.target.value }))}
                  placeholder="e.g. services, hvac, elevator, fire"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Keywords help the chatbot find this answer even when the user phrases the question differently.
                </p>
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button
                onClick={closeModal}
                disabled={saving}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 rounded-lg transition-colors flex items-center gap-2"
              >
                {saving && (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                {editingEntry ? "Save Changes" : "Add Entry"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
