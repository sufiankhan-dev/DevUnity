"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PageShell } from "@/components/SectionShell";
import { PageHeader } from "@/components/PageHeader";
import { SpotlightCard } from "@/components/SpotlightCard";
import { MessageSquare, ThumbsUp, PenSquare, ChevronUp, CheckCircle2 } from "lucide-react";

export default function QuestionPage() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "How to optimize React performance?",
      content:
        "I'm working on a large React application and noticed some performance issues. What are some best practices for optimizing React performance?",
      author: "Abeer Khan",
      avatar: "/placeholder.svg?height=50&width=50",
      date: "2024-03-15",
      votes: 5,
      answers: 2,
      tags: ["React", "Performance"],
    },
    {
      id: 2,
      title: "Difference between useEffect and useLayoutEffect",
      content:
        "Can someone explain the key differences between useEffect and useLayoutEffect hooks in React? When should I use one over the other?",
      author: "Ahmed Khan",
      avatar: "/placeholder.svg?height=50&width=50",
      date: "2024-03-14",
      votes: 3,
      answers: 1,
      tags: ["React", "Hooks"],
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ title: "", content: "" });

  const handleNewQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.title.trim() || !newQuestion.content.trim()) return;
    setQuestions([
      {
        id: Date.now(),
        title: newQuestion.title,
        content: newQuestion.content,
        author: "You",
        avatar: "/placeholder.svg",
        date: new Date().toISOString().split("T")[0],
        votes: 0,
        answers: 0,
        tags: ["New"],
      },
      ...questions,
    ]);
    setNewQuestion({ title: "", content: "" });
    setShowForm(false);
  };

  return (
    <PageShell withPattern>
      <div className="container mx-auto max-w-4xl px-4 pb-16">
        <PageHeader
          title="Developer"
          highlight="Questions"
          subtitle="Get help from the community or share your expertise by answering."
        >
          <Button
            className="bg-brand text-zinc-950 font-semibold hover:bg-brand-dark"
            onClick={() => setShowForm(!showForm)}
          >
            <PenSquare className="mr-2 h-4 w-4" />
            {showForm ? "Cancel" : "Ask Question"}
          </Button>
        </PageHeader>

        {showForm && (
          <SpotlightCard className="mb-8 p-6 animate-fade-in-up">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Ask a Question
            </h3>
            <form onSubmit={handleNewQuestion} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="q-title" className="text-zinc-300">
                  Title
                </Label>
                <Input
                  id="q-title"
                  placeholder="What's your question? Be specific."
                  value={newQuestion.title}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, title: e.target.value })
                  }
                  className="border-zinc-700 bg-zinc-800/80 text-white focus-visible:ring-brand/50"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="q-content" className="text-zinc-300">
                  Details
                </Label>
                <Textarea
                  id="q-content"
                  placeholder="Provide context, what you've tried, and expected behavior..."
                  value={newQuestion.content}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, content: e.target.value })
                  }
                  className="min-h-[120px] border-zinc-700 bg-zinc-800/80 text-white focus-visible:ring-brand/50"
                  required
                />
              </div>
              <Button
                type="submit"
                className="bg-brand text-zinc-950 hover:bg-brand-dark"
              >
                <PenSquare className="mr-2 h-4 w-4" />
                Post Question
              </Button>
            </form>
          </SpotlightCard>
        )}

        <div className="space-y-4">
          {questions.map((question) => (
            <SpotlightCard key={question.id} className="overflow-hidden">
              <div className="flex gap-4 p-5">
                <div className="hidden sm:flex flex-col items-center gap-1 min-w-[48px]">
                  <button
                    type="button"
                    className="flex flex-col items-center rounded-lg border border-zinc-700/80 bg-zinc-800/50 px-2 py-2 transition-colors hover:border-brand/30 hover:bg-brand/5"
                    aria-label="Upvote"
                  >
                    <ChevronUp className="h-5 w-5 text-zinc-400" />
                    <span className="text-sm font-semibold text-white">
                      {question.votes}
                    </span>
                  </button>
                  <div className="flex items-center gap-1 text-xs text-zinc-500">
                    <MessageSquare className="h-3 w-3" />
                    {question.answers}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="mb-2 flex flex-wrap gap-2">
                    {question.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-brand/20 bg-brand/5 text-brand font-normal text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white hover:text-brand transition-colors cursor-pointer">
                    {question.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-zinc-400 line-clamp-2">
                    {question.content}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={question.avatar} alt={question.author} />
                        <AvatarFallback className="text-xs">
                          {question.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-zinc-400">
                        {question.author} · {question.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="sm:hidden text-zinc-400"
                      >
                        <ThumbsUp className="mr-1 h-3.5 w-3.5" />
                        {question.votes}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-zinc-700 text-zinc-300 hover:bg-brand/5 hover:border-brand/30 hover:text-brand"
                      >
                        <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                        Answer
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
