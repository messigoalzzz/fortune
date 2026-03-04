import AssistanceNav from "@/components/assistance/Nav";

const assistanceButton = `flex items-center space-x-[1.25rem] border-[2px] border-black  px-[2rem] h-[45px] rounded-[0.3125rem]`


function AssistanceLayout({ children }: { children: React.ReactNode }) {


  return (
    <div className="bg-[#e9eaed]">
      <div className="text-center py-[30px]" style={{ background: '#e9eaed url("//www.fortunex.com/en/file/image/banners/info-banner.webp?build=202602231800") 50%/cover no-repeat' }}>
        <div className="mx-auto max-w-[80rem] px-[1rem] flex flex-col space-y-[20px]">
          <h2 className="text-[#1e1f20] font-[600] text-[2rem] leading-[1.875] ">
            Need assistance? Contact us 24/7
          </h2>
          <div className="flex items-center justify-center gap-[1rem] font-semibold">
            <button className={assistanceButton}>
              <svg className="w-[2.625rem]" fill="currentColor" fillRule="evenodd" viewBox="0 0 42 30" xmlns="http://www.w3.org/2000/svg"><path d="M32.227,28.184c0,0 -2.676,0.619 -4.849,0.619c-7.715,0 -13.795,-5.873 -13.795,-12.219c0,-5.913 5.797,-11.905 14.201,-11.905c9.383,0 14.151,6.812 14.151,12.174c0,4.538 -3.447,7.569 -3.447,7.569l3.512,5.578l-9.773,-1.816Zm2.737,-13.329c1.336,0 2.421,1.082 2.421,2.415c0,1.333 -1.085,2.416 -2.421,2.416c-1.337,0 -2.422,-1.083 -2.422,-2.416c0,-1.333 1.085,-2.415 2.422,-2.415Zm-7.255,0c1.336,0 2.421,1.082 2.421,2.415c0,1.333 -1.085,2.416 -2.421,2.416c-1.337,0 -2.422,-1.083 -2.422,-2.416c0,-1.333 1.085,-2.415 2.422,-2.415Zm-7.255,0c1.336,0 2.421,1.082 2.421,2.415c0,1.333 -1.085,2.416 -2.421,2.416c-1.337,0 -2.422,-1.083 -2.422,-2.416c0,-1.333 1.085,-2.415 2.422,-2.415Z"></path><path d="M14.579,24.043c-2.032,0.018 -4.633,-0.523 -4.633,-0.523l-9.016,1.662c-0.636,0.082 -1.161,-0.618 -0.825,-1.217l2.952,-4.654c-2.519,-2.68 -3.604,-7.025 -2.464,-10.445c1.818,-5.454 7.636,-8.899 13.732,-8.866c3.518,0.059 7.121,1.283 9.784,3.491c-0.663,0.151 -1.312,0.34 -1.943,0.565c-2.251,-1.571 -5.056,-2.405 -7.859,-2.452c-4.523,-0.025 -9.347,2.126 -11.509,6.191c-1.821,3.425 -1.291,8.001 1.823,10.806c0,0 0.436,0.498 0.14,1.024l-2.313,3.646c0,0 7.446,-1.369 7.446,-1.369c0.39,-0.013 1.776,0.269 3.532,0.378c0.335,0.621 0.722,1.209 1.153,1.763Z"></path></svg>
              <span>Live Support</span>
            </button>
            <button className={assistanceButton}>
              <svg className="w-[2.125rem]" fill="currentColor" viewBox="0 0 34.41 20.48" xmlns="http://www.w3.org/2000/svg"><path d="M17.026,14.626l0,-0.005l6.115,-4.897l9.412,10.277l-31.062,0l9.412,-10.277l6.114,4.897l0,0.005m-16.817,5.3l0.029,-18.943l9.851,8.158l-9.88,10.785Zm0.128,-19.925l33.388,0l-16.694,11.862l-16.694,-11.862Zm23.636,9.14l9.836,-8.147l0,18.884l-9.836,-10.737Z"></path></svg>
              <span>Email Us</span>
            </button>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-[minmax(120px,320px)_1fr] p-6 gap-12 container-custom !pb-20 !pt-10">
        <AssistanceNav />
        {children}
      </div>
    </div>
  );
}

export default AssistanceLayout;

