"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PageShell } from "@/components/SectionShell";
import { PageHeader } from "@/components/PageHeader";
import { SpotlightCard } from "@/components/SpotlightCard";
import {
  Loader2,
  PenSquare,
  Bold,
  Italic,
  List,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Code,
  Type,
} from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import TextAlign from "@tiptap/extension-text-align";
import { cn } from "@/lib/utils";

type EditorInstance = NonNullable<ReturnType<typeof useEditor>>;

type ToolbarTool = {
  icon: React.ComponentType<{ className?: string }>;
  action: (editor: EditorInstance) => void;
  isActive: (editor: EditorInstance) => boolean;
};

const toolbarGroups: { label: string; tools: ToolbarTool[] }[] = [
  {
    label: "Format",
    tools: [
      {
        icon: Bold,
        action: (editor) => editor.chain().focus().toggleBold().run(),
        isActive: (editor) => editor.isActive("bold"),
      },
      {
        icon: Italic,
        action: (editor) => editor.chain().focus().toggleItalic().run(),
        isActive: (editor) => editor.isActive("italic"),
      },
      {
        icon: Code,
        action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
        isActive: (editor) => editor.isActive("codeBlock"),
      },
    ],
  },
  {
    label: "Headings",
    tools: [
      {
        icon: Heading1,
        action: (editor) =>
          editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: (editor) => editor.isActive("heading", { level: 1 }),
      },
      {
        icon: Heading2,
        action: (editor) =>
          editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: (editor) => editor.isActive("heading", { level: 2 }),
      },
      {
        icon: Heading3,
        action: (editor) =>
          editor.chain().focus().toggleHeading({ level: 3 }).run(),
        isActive: (editor) => editor.isActive("heading", { level: 3 }),
      },
    ],
  },
  {
    label: "Layout",
    tools: [
      {
        icon: List,
        action: (editor) => editor.chain().focus().toggleBulletList().run(),
        isActive: (editor) => editor.isActive("bulletList"),
      },
      {
        icon: AlignLeft,
        action: (editor) => editor.chain().focus().setTextAlign("left").run(),
        isActive: (editor) => editor.isActive({ textAlign: "left" }),
      },
      {
        icon: AlignCenter,
        action: (editor) => editor.chain().focus().setTextAlign("center").run(),
        isActive: (editor) => editor.isActive({ textAlign: "center" }),
      },
      {
        icon: AlignRight,
        action: (editor) => editor.chain().focus().setTextAlign("right").run(),
        isActive: (editor) => editor.isActive({ textAlign: "right" }),
      },
    ],
  },
];

export default function AddBlogPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/sign-in");
    }
  }, [isPending, session, router]);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none focus:outline-none min-h-[320px] px-1",
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content: editor?.getHTML() || "" }),
      });

      if (response.ok) {
        router.push("/blogs");
      } else {
        throw new Error(`Failed to add blog: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell withPattern>
      <div className="container mx-auto max-w-4xl px-4 pb-16">
        <PageHeader
          title="Create"
          highlight="Blog Post"
          subtitle="Share your knowledge with the DevUnity community."
          centered
        />

        <form onSubmit={handleSubmit}>
          <SpotlightCard className="p-6 md:p-8 mb-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-2 text-zinc-300">
                <Type className="h-4 w-4 text-brand" />
                Title
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter a compelling title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-zinc-700 bg-zinc-800/80 text-lg text-white placeholder:text-zinc-500 focus-visible:ring-brand/50"
                required
              />
            </div>
          </SpotlightCard>

          <SpotlightCard className="overflow-hidden mb-6">
            <div className="border-b border-zinc-800/80 bg-zinc-900/60 p-3">
              {toolbarGroups.map((group, gi) => (
                <div key={group.label}>
                  {gi > 0 && <Separator className="my-2 bg-zinc-800" />}
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="mr-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
                      {group.label}
                    </span>
                    {group.tools.map((tool, ti) => (
                      <Button
                        key={ti}
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => editor && tool.action(editor)}
                        className={cn(
                          "h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800",
                          editor &&
                            tool.isActive(editor) &&
                            "bg-brand/10 text-brand"
                        )}
                        title={group.label}
                      >
                        <tool.icon className="h-4 w-4" />
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6">
              <EditorContent editor={editor} className="text-white" />
            </div>
          </SpotlightCard>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-brand text-zinc-950 font-semibold hover:bg-brand-dark"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <PenSquare className="mr-2 h-4 w-4" />
                Publish Post
              </>
            )}
          </Button>
        </form>
      </div>
    </PageShell>
  );
}
