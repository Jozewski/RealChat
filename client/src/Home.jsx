import { Link } from "react-router";

const Home = () => {
  return (
    <>
      <div className="flex justify-center items-center bg-slate-300">
        <div className="sm:py-20">
          <div className="flex flex-col rounded-2xl w-full xl:w-156 bg-slate-500 text-[#111827] shadow-xl">
            <figure className="flex justify-center items-center">
              <img
                src={new URL("./assets/realchat.png", import.meta.url).href}
                alt="Chat Bubble"
                className="rounded-t-2xl m-2"
              />
            </figure>

            <div className="flex flex-col p-8 h-full">
              <div className="text-3xl  font-bold pb-6">Real Chat</div>
              <div className="  text-lg pb-12">
                Join Us to Discuss What Really Matters...
              </div>
              <div className="flex flex-col gap-3  text-base">
                <div className="flex flex-row gap-3">
                  <div className="text-green-600">
                  <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="yellow"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="red"
                        className="size-9"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                        />
                      </svg>
                  </div>
                  <div className="font-bold">
                    Chat Rooms to Discuss Scripture{" "}
                  </div>
                </div>
                <div className="flex flex-row gap-3">
                  <div className="text-green-600">
                  <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="red"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="yellow"
                        className="size-9"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                        />
                      </svg>
                  </div>
                  <div>Choose the Topic You Wish to Discuss</div>
                </div>

                <div className="flex flex-row gap-3">
                  <div className="text-green-600">
                  <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="purple"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="yellow"
                        className="size-9"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                        />
                      </svg>
                  </div>
                  <div>Share Your Thoughts and Questions</div>
                </div>
                <div className="flex flex-row gap-3">
                  <div className="text-green-600">
                  <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="blue"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="yellow"
                        className="size-9"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                        />
                      </svg>
                  </div>
                  <div>Study the Bible With a Community</div>
                </div>
              </div>
              <div className="flex grow"></div>
              <Link to="/login" className="flex pt-10">
                <button className="w-full bg-[red] text-[#ffffff] font-bold text-base p-3 rounded-lg hover:bg-purple-800 active:scale-95 transition-transform transform">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
