import { useState } from "react";
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Link as LinkIcon, 
  Image as ImageIcon,
  Code,
  Eye,
  EyeOff,
  Heading1,
  Heading2,
  Heading3,
  Quote
} from "lucide-react";

interface MarkdownEditorProps {
  name?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  required?: boolean;
}

export default function MarkdownEditor({ 
  name,
  value, 
  onChange, 
  placeholder = "Start writing...",
  minHeight = "400px",
  required = false
}: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(false);

  const insertMarkdown = (before: string, after: string = "") => {
    const textarea = document.querySelector('textarea[name="markdown-editor"]') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    
    onChange(newText);
    
    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus();
      const cursorPos = start + before.length + selectedText.length;
      textarea.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  };

  const insertAtCursor = (text: string) => {
    const textarea = document.querySelector('textarea[name="markdown-editor"]') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText = value.substring(0, start) + text + value.substring(end);
    
    onChange(newText);
    
    setTimeout(() => {
      textarea.focus();
      const cursorPos = start + text.length;
      textarea.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  };

  const renderMarkdownPreview = (markdown: string) => {
    // Simple markdown parser for preview
    let html = markdown;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-5 mb-3">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-6 mb-4">$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    
    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 underline hover:text-blue-800">$1</a>');
    
    // Images
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto my-4 rounded-lg" />');
    
    // Code blocks
    html = html.replace(/```(.*?)```/gs, '<pre class="bg-gray-100 p-4 rounded-lg my-3 overflow-x-auto"><code>$1</code></pre>');
    
    // Inline code
    html = html.replace(/`(.*?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>');
    
    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-gray-300 pl-4 italic my-3">$1</blockquote>');
    
    // Unordered lists
    html = html.replace(/^\* (.*$)/gim, '<li class="ml-6 list-disc">$1</li>');
    html = html.replace(/^- (.*$)/gim, '<li class="ml-6 list-disc">$1</li>');
    
    // Ordered lists
    html = html.replace(/^\d+\. (.*$)/gim, '<li class="ml-6 list-decimal">$1</li>');
    
    // Line breaks
    html = html.replace(/\n\n/g, '</p><p class="mb-3">');
    html = '<p class="mb-3">' + html + '</p>';

    return html;
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => insertMarkdown("# ", "")}
          className="p-2 hover:bg-gray-200 rounded transition"
          title="Heading 1"
        >
          <Heading1 size={18} />
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown("## ", "")}
          className="p-2 hover:bg-gray-200 rounded transition"
          title="Heading 2"
        >
          <Heading2 size={18} />
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown("### ", "")}
          className="p-2 hover:bg-gray-200 rounded transition"
          title="Heading 3"
        >
          <Heading3 size={18} />
        </button>
        
        <div className="w-px bg-gray-300 mx-1"></div>

        <button
          type="button"
          onClick={() => insertMarkdown("**", "**")}
          className="p-2 hover:bg-gray-200 rounded transition"
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown("*", "*")}
          className="p-2 hover:bg-gray-200 rounded transition"
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown("`", "`")}
          className="p-2 hover:bg-gray-200 rounded transition"
          title="Inline Code"
        >
          <Code size={18} />
        </button>

        <div className="w-px bg-gray-300 mx-1"></div>

        <button
          type="button"
          onClick={() => insertAtCursor("- ")}
          className="p-2 hover:bg-gray-200 rounded transition"
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          type="button"
          onClick={() => insertAtCursor("1. ")}
          className="p-2 hover:bg-gray-200 rounded transition"
          title="Numbered List"
        >
          <ListOrdered size={18} />
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown("> ", "")}
          className="p-2 hover:bg-gray-200 rounded transition"
          title="Quote"
        >
          <Quote size={18} />
        </button>

        <div className="w-px bg-gray-300 mx-1"></div>

        <button
          type="button"
          onClick={() => insertMarkdown("[", "](url)")}
          className="p-2 hover:bg-gray-200 rounded transition"
          title="Insert Link"
        >
          <LinkIcon size={18} />
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown("![", "](image-url)")}
          className="p-2 hover:bg-gray-200 rounded transition"
          title="Insert Image"
        >
          <ImageIcon size={18} />
        </button>

        <div className="flex-1"></div>

        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className={`p-2 rounded transition ${showPreview ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}
          title={showPreview ? "Hide Preview" : "Show Preview"}
        >
          {showPreview ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Editor Area */}
      <div className="grid" style={{ gridTemplateColumns: showPreview ? '1fr 1fr' : '1fr' }}>
        {/* Textarea */}
        <div className={`${showPreview ? 'border-r border-gray-300' : ''}`}>
          <textarea
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-full p-4 resize-none focus:outline-none font-mono text-sm"
            style={{ minHeight }}
            required={required}
          />
        </div>

        {/* Preview */}
        {showPreview && (
          <div 
            className="p-4 overflow-auto prose prose-sm max-w-none"
            style={{ minHeight }}
            dangerouslySetInnerHTML={{ __html: renderMarkdownPreview(value) }}
          />
        )}
      </div>

      {/* Footer Info */}
      <div className="bg-gray-50 border-t border-gray-300 px-4 py-2 text-xs text-gray-500 flex justify-between">
        <span>Markdown supported</span>
        <span>{value.length} characters</span>
      </div>
    </div>
  );
}