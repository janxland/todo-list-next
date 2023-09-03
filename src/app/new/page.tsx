import Link from "next/link"
import { prisma } from "@/db"
import { type } from "os"
import { redirect } from "next/navigation"

async function createTodo(data: FormData) {
    "use server" //Says this is going to be a server function

    const title = data.get("title")?.valueOf()
    if (typeof title !== "string" || title.length === 0) {
        throw new Error("Invalid title")
    }

    await prisma.todo.create({ data: { title, complete: false } })
    redirect("/") //redirect back to our homepage

    // console.log("Hello There!")
}

export default function Page() {
    return <>
        <header className="flex justify-between items-center mb-4">
            <h1 className="text-2x1">New</h1>

        </header>
        <form action={createTodo} className="flex gap-2 flex-col">

            <input type="text" name="title" className="border border-slate-300 bg-transparent rounded px-2 py-1 
            outline-none focus-within:border-slate100" />

            <div className="flex gap-1 justify-end">

                <Link href=".." className="border border-slate-300 text-slate-300 px-2 py-1 rounded 
        hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Cancel</Link>

                <button type="submit" className="border border-slate-300 text-slate-300 px-2 py-1 rounded 
        hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Create</button>

            </div>
        </form>

    </>
}