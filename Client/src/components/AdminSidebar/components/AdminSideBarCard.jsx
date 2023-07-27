import support from "../../../assets/icons/support.png";

const SidebarCard = () => {
  return (
    <div className="relative mt-8 mb-6 flex h-64 w-56 justify-center overflow-hidden rounded-[20px] bg-[#cf7d39]">
      <div className="mt-16">
        <div className="absolute top-6 left-8">
          <p className="mb-1 text-lg font-medium text-white">Support 24/7</p>
          <p className=" mb-3 text-sm font-normal text-white opacity-50">
            Contact us anytime
          </p>
          <button className="text-neutral-50 absolute z-10 h-9 w-[70px] rounded-[10px] bg-yellow-500 text-sm font-medium text-white">
            Start
          </button>
        </div>
        <img
          src={support}
          width={180}
          className="relative left-6 top-[1rem] z-0"
        />
      </div>
    </div>
  );
};

export default SidebarCard;
