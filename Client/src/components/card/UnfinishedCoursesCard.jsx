import React from "react";

const UnfinishedCoursesCard = () => {
  return (
    <div className="bg-neutral-50 border-zinc-100 inline-flex h-60 w-[760px] items-start justify-start gap-4 rounded-xl border ">
      <div className="relative h-60 w-[356px] rounded-[10px]">
        <img
          className="absolute left-0 top-0  h-60 w-[356px]"
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80"
          alt=""
        />
      </div>
      <div className="relative h-60 w-[358px]">
        <div className="absolute left-0 top-[186px] inline-flex w-[358px] items-end justify-between gap-[77px] pb-2.5">
          <div className="flex h-11 items-center justify-start gap-2.5">
            <div className="relative h-11 w-11 rounded-[10px]">
              <img
                className="absolute left-0 top-0 h-11 w-11"
                src="https://via.placeholder.com/44x44"
                alt=""
              />
            </div>
            <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-1 rounded-lg">
              <div className="text-stone-700 self-stretch text-sm font-medium leading-snug tracking-tight">
                Jon Kantner
              </div>
              <div className="text-stone-700 w-[113px] text-xs font-normal leading-[18px] tracking-tight text-opacity-75">
                Design teacher
              </div>
            </div>
          </div>
          <button className="flex items-center justify-start gap-2 rounded-[10px] bg-[#000000] py-2.5 pl-6 pr-6 text-center text-sm font-medium capitalize leading-tight text-white">
            Let's go
          </button>
        </div>
        <div className="absolute left-0 top-[107px] inline-flex flex-col items-start justify-start gap-2 pt-3 pb-9">
          <div className="relative h-[9px] w-[358px]">
            <div className="absolute left-[259px] top-0 h-[9px] w-[9px] rounded-full bg-amber-500" />
          </div>
          <div className="relative h-3.5 w-[358px]">
            <div className="text-zinc-950 absolute left-[2px] top-0 text-xs font-normal capitalize text-opacity-75">
              points : 75 / 100
            </div>
            <div className="text-zinc-950 absolute left-[307px] top-0 text-right text-xs font-normal capitalize text-opacity-75">
              days : 56
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-[51px] inline-flex items-center justify-start gap-[30px] pr-[30px] pt-3.5 pb-[26px]">
          <div className="flex items-center justify-start gap-2">
            <div className="flex w-3.5 items-center justify-center">
              <div className="text-zinc-950 text-center text-base font-black text-opacity-25">
                
              </div>
            </div>
            <div className="text-zinc-950 text-[13px] font-medium capitalize text-opacity-75">
              Lesson : 6
            </div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <div className="flex w-3.5 items-center justify-center">
              <div className="text-zinc-950 text-center text-base font-black text-opacity-25">
                
              </div>
            </div>
            <div className="text-zinc-950 text-[13px] font-medium capitalize text-opacity-75">
              student : 198
            </div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <div className="flex w-[18px] items-center justify-center">
              <div className="text-zinc-950 text-center text-base font-black text-opacity-25">
                
              </div>
            </div>
            <div className="text-zinc-950 text-[13px] font-medium capitalize text-opacity-75">
              Beginner
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 inline-flex h-[51px] flex-col items-start justify-start py-4">
          <div className="text-zinc-950 h-[19px] w-[329px] text-base font-medium capitalize">
            Course – Introduction to Hosting
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnfinishedCoursesCard;
