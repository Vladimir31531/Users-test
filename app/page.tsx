import { Users } from "@/modules/Users";

export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center py-10 px-[20px] xl:py-10 xl:px-[300px] lg:px-[150px] md:px-[50px]">
      <h1 className="text-xl sm:text-3xl font-bold mb-10">
        Таблица пользователей
      </h1>
      <Users />
    </div>
  );
}
