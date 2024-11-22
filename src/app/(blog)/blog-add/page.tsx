"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
} from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import TextAlign from "@tiptap/extension-text-align";

export default function AddBlogPage() {
  const router = useRouter();
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none focus:outline-none min-h-[300px]",
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const blogData = {
      title,
      content: editor?.getHTML() || "",
      author: user?.fullName || "Anonymous",
      avatar: user?.imageUrl || "",
    };

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        router.push("/blogs");
      } else {
        throw new Error(
          `Failed to add blog: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
      // You might want to show an error message to the user here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/background-pattern.png"
          alt="Background Pattern"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/70 to-zinc-950" />
      </div>

      <div className="relative z-10 flex-grow flex flex-col max-w-6xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-center text-white flex items-center justify-center mb-5">
          <PenSquare className="mr-2 h-6 w-6 text-[#9CE630]" />
          Create Blog Post
        </h1>

        <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Blog Title
            </label>
            <Input
              id="title"
              type="text"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white text-lg py-3 px-4 rounded-md shadow-sm focus:ring-2 focus:ring-[#9CE630] focus:border-transparent"
              required
            />
          </div>

          <div className="bg-zinc-800 border border-zinc-700 rounded-md p-4 mb-4 flex-grow flex flex-col">
            <div className="flex flex-wrap gap-2 mb-2">
              <Button
                type="button"
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className={`p-2 ${
                  editor?.isActive("bold") ? "bg-zinc-700" : "bg-zinc-800"
                }`}
                title="Bold"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className={`p-2 ${
                  editor?.isActive("italic") ? "bg-zinc-700" : "bg-zinc-800"
                }`}
                title="Italic"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                className={`p-2 ${
                  editor?.isActive("bulletList") ? "bg-zinc-700" : "bg-zinc-800"
                }`}
                title="Bullet List"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={`p-2 ${
                  editor?.isActive("heading", { level: 1 })
                    ? "bg-zinc-700"
                    : "bg-zinc-800"
                }`}
                title="Heading 1"
              >
                <Heading1 className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={`p-2 ${
                  editor?.isActive("heading", { level: 2 })
                    ? "bg-zinc-700"
                    : "bg-zinc-800"
                }`}
                title="Heading 2"
              >
                <Heading2 className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={`p-2 ${
                  editor?.isActive("heading", { level: 3 })
                    ? "bg-zinc-700"
                    : "bg-zinc-800"
                }`}
                title="Heading 3"
              >
                <Heading3 className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                onClick={() =>
                  editor?.chain().focus().setTextAlign("left").run()
                }
                className={`p-2 ${
                  editor?.isActive({ textAlign: "left" })
                    ? "bg-zinc-700"
                    : "bg-zinc-800"
                }`}
                title="Align Left"
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                onClick={() =>
                  editor?.chain().focus().setTextAlign("center").run()
                }
                className={`p-2 ${
                  editor?.isActive({ textAlign: "center" })
                    ? "bg-zinc-700"
                    : "bg-zinc-800"
                }`}
                title="Align Center"
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                onClick={() =>
                  editor?.chain().focus().setTextAlign("right").run()
                }
                className={`p-2 ${
                  editor?.isActive({ textAlign: "right" })
                    ? "bg-zinc-700"
                    : "bg-zinc-800"
                }`}
                title="Align Right"
              >
                <AlignRight className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                className={`p-2 ${
                  editor?.isActive("codeBlock") ? "bg-zinc-700" : "bg-zinc-800"
                }`}
                title="Code Block"
              >
                <Code className="h-4 w-4" />
              </Button>
            </div>
            <EditorContent
              editor={editor}
              className="flex-grow overflow-auto text-white"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#9CE630] text-black hover:bg-[#8BD520] py-3 text-lg font-normal"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {/* Publishing... */}
              </>
            ) : (
              "Post Blog"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
