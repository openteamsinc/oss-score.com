import { promises as fs } from 'fs';

export default async function Home() {
  const file = await fs.readFile(process.cwd() + '/package-json/pypi.json', 'utf8');
  const allData = JSON.parse(file);
  return (
    <main className="min-h-screen px-[10rem] py-20 flex flex-col gap-10">
      <h1 className='text-center text-[2.5rem] font-bold'>All Projects</h1>
      <div className="min-h-screen grid grid-cols-3 gap-5">
        {
          allData.map((data: any) => {
            return <div className='w-full h-min flex flex-col gap-5 border border-gray-300 rounded shadow-sm p-5'>
              <h2 className='text-xl'>Project Name: <span className='font-semibold'>{data.project_name}</span></h2>
              <div className='w-full flex flex-col'>
                <span>
                  Source Type: <span className='font-medium'>{data.source_type}</span>
                </span>
                <span>
                  Packages: <span className='font-medium'>{data.packages.length}</span>
                </span>
              </div>
              <div className='grid grid-cols-2 gap-5'>
                <div className='w-full flex flex-col'>
                  <span>
                    Maturity: <span className='rounded-full px-4 py-2 bg-blue-900 text-white font-medium'>{data.scores.maturity.value}</span>
                  </span>
                  <ul className='list-disc pl-5 text-sm text-gray-500 mt-5'>
                    {data.scores.maturity.notes.map((note: string) => {
                      return <li>{note}</li>
                    })}
                  </ul>
                </div>
                <div className='w-full flex flex-col'>
                  <span>
                    Health Risk: <span className='rounded-full px-4 py-2 bg-green-500 text-white font-medium'>{data.scores.health_risk.value}</span>
                  </span>
                  <ul className='list-disc pl-5 text-sm text-gray-500 mt-5'>
                    {data.scores.health_risk.notes.map((note: string) => {
                      return <li>{note}</li>
                    })}
                  </ul>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-5 mt-5 border-t border-gray-300 pt-5'>
                <button className='text-blue-500 font-semibold hover:underline text-start'>Visit Source</button>
                <button className='text-blue-500 font-semibold hover:underline text-end'>Visit Homepage</button>

              </div>
            </div>
          })
        }

      </div>
    </main>
  );
}
