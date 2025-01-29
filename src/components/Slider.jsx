import React, { useEffect, useState } from "react";

const Slider = ({ children: slides,autoslide=false,autoslideInterval=5000 }) => {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr == 0 ? slides.length - 1 : curr - 1));

  const next = () =>
    setCurr((curr) => (curr == slides.length -1 ? 0 : curr + 1));

  useEffect(()=>{
    if(!autoslide) return;
    const interval=setInterval(next,autoslideInterval);
    return ()=>clearInterval(interval);

  },[])
  return (
    <section className="overflow-hidden relative ">
      <div className=" w-full h-1/2 flex transition-transform ease-out duration-500"
      style={{transform:`translateX(-${curr*100}%)`}}
      >
        {slides}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="rounded-full shadow hover:bg-slate-500 hover:text-white p-2 bg-white "
        >
          left
        </button>
        <button
          onClick={next}
          className="rounded-full shadow hover:bg-slate-500 hover:text-white p-2 bg-white "
        >
          right
        </button>
      </div>

      <div className="flex justify-center items-center gap-3">
        {
            slides.map((_,i)=>(
                <div className={`rounded-full transition-all  w-3 h-3 bg-red-50 ${curr === i ? 'p-4':'bg-opacity-50'}`}
                />
            ))
        }
      </div>
    </section>
  );
};

export default Slider;
