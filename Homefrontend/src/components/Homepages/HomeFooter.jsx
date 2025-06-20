export default function HomeFooter(){
    return(
        <div>
            <footer className="text-center text-sm text-gray-500 py-6">
                    <div className="flex justify-center gap-6 text-2xl text-gray-600 mb-3">
                        <a href="https://facebook.com" target="_blank" className="hover:text-blue-600" aria-label="Facebook">
                        <i className="bi bi-facebook"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" className="hover:text-pink-500" aria-label="Instagram">
                        <i className="bi bi-instagram"></i>
                        </a>
                        <a href="mailto:example@gmail.com" className="hover:text-red-500" aria-label="Email">
                        <i className="bi bi-envelope-fill"></i>
                        </a>
                        <a href="https://github.com/yourprofile" target="_blank" className="hover:text-black" aria-label="GitHub">
                        <i className="bi bi-github"></i>
                        </a>
                    </div>
                ©2025 Home Serve. All rights Reserved
            </footer>
        </div>
    )
}