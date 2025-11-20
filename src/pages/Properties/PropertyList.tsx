export default function PropertyList({
  filteredProperties,
  tabs,
  activeTab,
  setActiveTab,
  navigate,
}: any) {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-15 md">
      <h1 className="flex alignItem-center justify-center text-3xl font-semibold mb-8">
        Recommended For You
      </h1>

      <div className="flex gap-4 mb-6 flex-wrap alignItem-center justify-center">
        {tabs.map((tab: string) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-4xl">
        {filteredProperties.map((p: any) => (
          <div
            key={p.id}
            onClick={() => navigate(`/propertydeatilspage`)}
            className="bg-white rounded shadow overflow-hidden border cursor-pointer hover:shadow-lg transition"
          >
            <div className="w-full h-60">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
            </div>

            <div className="p-3">
              <h4 className="font-semibold text-sm">{p.title}</h4>
              <p className="text-xs text-gray-500">{p.location}</p>

              <div className="mt-2 text-xs text-gray-600 flex gap-2 flex-wrap">
                {p.amenities.map((a: string, i: number) => (
                  <span key={i} className="bg-gray-100 px-2 py-1 rounded text-gray-700">
                    {a}
                  </span>
                ))}
                <span className="bg-gray-100 px-2 py-1 rounded text-gray-700">{p.area}</span>
              </div>

              <hr className="my-2" />

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <img
                    src={p.owner.profile}
                    alt={p.owner.name}
                    className="w-6 h-8 rounded-full object-cover"
                  />
                  <span>{p.owner.name}</span>
                </div>

                <span className="font-semibold text-blue-600">{p.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
