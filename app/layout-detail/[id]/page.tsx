export default async function LayoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-[#005a8d] flex items-center justify-center p-8 gap-8">
      {/* 左側：CSS DESIGN コントロールパネル */}
      <aside className="w-80 bg-[#16c7b7] rounded-[3rem] p-10 flex flex-col gap-8 shadow-xl text-[#ff3399]">
        <h2 className="text-2xl font-bold text-center mb-4">CSS DESIGN</h2>

        {/* コントロール項目（本来はここもコンポーネント化すると良いです） */}
        <div className="flex flex-col gap-6 text-black font-semibold">
          <div className="flex justify-between items-center">
            <span>Background</span>
            <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-blue-500 via-purple-500 to-red-500" />
          </div>
          <div className="flex justify-between items-center">
            <span>Font-Family</span>
            <span className="text-sm font-normal">ABeeZee ▼</span>
          </div>
          {/* スライダーの簡易表現 */}
          <div className="flex flex-col gap-2">
            <span>Border-Radius</span>
            <div className="h-2 w-full bg-blue-700 rounded-full" />
          </div>
        </div>
      </aside>

      {/* 右側：メインコンテンツエリア */}
      <section className="flex-1 flex flex-col gap-4">
        {/* ヘッダー部分 */}
        <div className="bg-[#8a00ff] rounded-[2.5rem] p-6 flex justify-between items-center text-white">
          <h1 className="text-2xl font-mono ml-8 uppercase">
            {id.replace("-", " ")} Grid
          </h1>
          <div className="flex gap-2 mr-4">
            <button className="bg-pink-500 p-2 px-4 rounded-full">
              😎 ＞_
            </button>
          </div>
        </div>

        {/* ホワイトボード（グリッドプレビュー） */}
        <div className="bg-white rounded-4xl p-8 min-h-100 shadow-inner">
          {/* ここにグリッドのプレビューが入ります */}
          <p className="text-gray-400">Previewing: {id}</p>
        </div>
      </section>
    </main>
  );
}
