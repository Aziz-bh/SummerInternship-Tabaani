import nft1 from "assets/img/Logos/TabaaniAcademyLogo.png";

const Banner1 = () => {
  return (
    <div className="flex w-full flex-col rounded-[20px] bg-orange-400 bg-cover px-[30px] py-[30px] md:px-[64px] md:py-[56px]">
      <div className="w-full">
        <h4 className="mb-[14px] max-w-full text-xl font-bold text-white md:w-[64%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
          Create a course for Tabaani Community
        </h4>

        <div className="mt-[36px] flex items-center justify-between gap-4 sm:justify-start 2xl:gap-10">
          <button className="text-black linear rounded-xl bg-white px-4 py-2 text-center text-base font-medium transition duration-200 hover:!bg-white/80 active:!bg-white/70">
            Create a course
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner1;
