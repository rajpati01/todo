
import TodoAppClient from "./components/TodoAppClients"


export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">My Todo List</h1>
      <TodoAppClient />
    </main>
  )
}
