import React, { useState } from 'react';
import { supabase } from '@/lib/supabase'

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setModalIsOpen(true);
      setErrorMessage(error.error_description || error.message);
    } else {
      setModalIsOpen(true);
      setErrorMessage('Check your email for the login link!');
    }
    setLoading(false);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
      <div className="flex justify-center pt-16">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold mb-4 text-center">Welcome to Smarter Sales</h1>
          <p className="text-center mb-4">Sign in via magic link with your email below</p>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  type="email"
                  placeholder="Your email"
                  value={email}
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <button
                  className={`w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md ${
                      loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                  }`}
                  disabled={loading}
              >
                {loading ? <span>Loading</span> : <span>Send magic link</span>}
              </button>
            </div>
          </form>
        </div>
        {modalIsOpen && (
            <div
                className="fixed z-10 inset-0 overflow-y-auto"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
            >
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                ></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                          Email sent
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">{errorMessage}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={handleCloseModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}




// import { supabase } from '@/lib/supabase'
// import { useState } from 'react'
//
// export default function Login() {
//   const [loading, setLoading] = useState(false)
//   const [email, setEmail] = useState('')
//
//   const handleLogin = async (event) => {
//     event.preventDefault()
//
//     setLoading(true)
//     const { error } = await supabase.auth.signInWithOtp({ email })
//
//     if (error) {
//       alert(error.error_description || error.message)
//     } else {
//       alert('Check your email for the login link!')
//     }
//     setLoading(false)
//   }
//
//   return (
//     <div className="flex justify-center pt-16">
//       <div className="w-full max-w-md">
//         <h1 className="text-2xl font-semibold mb-4 text-center">Welcome to Smarter Sales </h1>
//         <p className="text-center mb-4">Sign in via magic link with your email below</p>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <input
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
//               type="email"
//               placeholder="Your email"
//               value={email}
//               required={true}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div>
//             <button
//               className={`w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md ${
//                 loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
//               }`}
//               disabled={loading}
//             >
//               {loading ? <span>Loading</span> : <span>Send magic link</span>}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }