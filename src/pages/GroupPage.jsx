export default function GroupPage() {
    const saved = localStorage.getItem("authGroup");
    const group = saved ? JSON.parse(saved) : null;

    if (!group) return <div className="container py-10 text-red-600">Нет доступа</div>;

    return (
        <div className="container">
            <h1 className="text-3xl font-bold mb-4">{group.name}</h1>
            <div className="">
                {group.members.map((member, i) =>
                    i === 0 ?
                        <div className="border border-black rounded-xl p-2 mb-2"><span className="text-gray-500 font-medium">Лидер:</span> {member.name}</div>
                    : i === 1 ?
                        <>
                            <div className="border border-black rounded-xl p-2 mb-2"><span className="text-gray-500 font-medium">Помощник:</span> {member.name}</div>

                            <h2 className="text-xl mb-2 font-medium">Участники:</h2>
                        </>
                            :
                        <div className="flex justify-between border border-black rounded-xl p-2 mb-2">
                            <div className="">{member.name}</div>
                            <div className="">{member.room}</div>
                        </div>
                )}
            </div>
        </div>
    );
}
