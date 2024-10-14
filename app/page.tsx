import { Users } from "@/modules/Users";

export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center py-10 px-[300px]">
      <h1 className="text-3xl font-bold mb-10">Таблица пользователей</h1>
      <Users />
    </div>
  );
}
