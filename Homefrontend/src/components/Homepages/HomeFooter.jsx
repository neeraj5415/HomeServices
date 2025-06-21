export default function HomeFooter(){
    return(
        <div>
            <footer className="text-center text-sm py-6 bg-gradient-to-r from-blue-200 to-blue-600 text-white rounded-xl">
                    <div className="flex justify-center gap-6 text-2xl text-gray-600 mb-3">
                        <a href="https://facebook.com" target="_blank" className="hover:shadow-xl hover:scale-112 transform transition duration-300" aria-label="Facebook">
                        <i className="bi bi-facebook"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" className="hover:shadow-xl hover:scale-112 transform transition duration-300" aria-label="Instagram">
                        <i className="bi bi-instagram"></i>
                        </a>
                        <a href="mailto:example@gmail.com" className="hover:shadow-xl hover:scale-112 transform transition duration-300" aria-label="Email">
                        <i className="bi bi-envelope-fill"></i>
                        </a>
                        <a href="https://github.com/yourprofile" target="_blank" className="hover:shadow-xl hover:scale-112 transform transition duration-300" aria-label="GitHub">
                        <i className="bi bi-github"></i>
                        </a>
                    </div>
               <p>&copy; {new Date().getFullYear()} Home Serve. All rights reserved.</p>
            </footer>
        </div>
    )
}