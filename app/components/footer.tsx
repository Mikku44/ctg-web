

export default function Footer() {
    return (
        <footer className="w-full  py-2 from-[var(--primary-color)] to-[var(--secondary-color)] bg-linear-120">
            <div className=" text-white container-x flex justify-between items-center">
                {/* left */}

                <div className="">
                    <div className="text-lg">Creative Tour Group</div>

                </div>
                {/* right */}
                <div className="text-sm ">© Copyright {new Date().getFullYear()} All right Reserved.</div>
            </div>
        </footer>
    )
}
