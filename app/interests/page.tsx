import { interests } from '@/lib/content'

function PhotoCollage({ photos }: { photos: string[] }) {
  if (photos.length === 0) return null

  const gridClass =
    photos.length === 1
      ? 'grid-cols-1'
      : photos.length === 2
      ? 'grid-cols-2'
      : photos.length === 3
      ? 'grid-cols-3'
      : 'grid-cols-2 md:grid-cols-4'

  return (
    <div className={`grid ${gridClass} gap-1 mt-6`}>
      {photos.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className={`overflow-hidden bg-beige-100 ${
            photos.length === 4 && i === 0 ? 'col-span-2 row-span-2' : ''
          }`}
          style={{ aspectRatio: photos.length === 1 ? '16/9' : '1/1' }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      ))}
    </div>
  )
}

export default function InterestsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-16">
        <h1 className="font-serif text-4xl font-light text-[#2c2c2c]">Interests</h1>
        <div className="w-full h-px bg-[#d4cfc8] mt-5" />
      </div>

      {interests.length === 0 ? (
        <div className="py-28 text-center">
          <p className="font-serif text-2xl font-light text-[#c8bfaf]">Interests coming soon.</p>
        </div>
      ) : (
        <div className="space-y-px bg-[#d4cfc8] border border-[#d4cfc8]">
          {interests.map((interest) => (
            <div key={interest.id} className="bg-beige-50 group relative">
              <div className="p-8 md:p-12">
                <h2 className="font-serif text-3xl font-light text-[#2c2c2c] mb-4 leading-tight">
                  {interest.title}
                </h2>
                <p className="font-sans text-sm text-[#555555] leading-relaxed max-w-2xl">
                  {interest.description}
                </p>
                <PhotoCollage photos={interest.photos} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
