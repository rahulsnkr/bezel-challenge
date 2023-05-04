import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay-ts';

interface Props {
  modalOpen: boolean;
  setModalOpen: (arg0: boolean) => void
}

const Modal: React.FC<Props> = ({ modalOpen, setModalOpen }) => {
  const [watchDetails, setWatchDetails] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch watch details from the API
    const fetchWatchDetails = async () => {
      if(JSON.stringify(watchDetails) === '{}'){
        setLoading(true);
        const response = await axios.get('/marketplace/orders/123');
        setWatchDetails(response.data);
        setLoading(false);  
      }
    };

    fetchWatchDetails();
  }, []);

  const handleAcceptClick = async () => {
    setLoading(true);
    const response = await axios.post('/marketplace/orders/123/accept');
    setLoading(false);
    setModalOpen(false);
  };

  const handleDeclineClick = async () => {
    setLoading(true);
    await axios.post('/marketplace/orders/123/decline');
    setLoading(false);
    setModalOpen(false)
  };

  return (
    <>
      {modalOpen ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-max max-w-4xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <LoadingOverlay
                active={loading}
                spinner
                text='Waiting...'
              >
                {/*header*/}
                <div className="flex justify-end px-5 py-2">
                <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                  >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto grid grid-cols-2 gap-4">
                  <div className="my-4 text-slate-500">
                    <div className='font-semibold text-base text-gray-500'>
                        CONGRATS!
                    </div>
                    <div className='font-semibold text-lg text-bezel-green text-4xl py-4'>
                        Your Watch Sold!
                    </div>
                    <div className='text-lg py-4'>
                        You have 1 business day to accept the sale. If you do not accept, it will be automatically rejected.
                    </div>
                    <div className='pb-4 pt-28'>
                        <button
                            className="w-full bg-bezel-green hover:bg-green-800 text-white font-bold py-4 px-4 rounded-full"
                            onClick={() => handleAcceptClick()}
                        >
                                Accept Sale
                        </button>
                    </div>
                    <div className='py-4'>
                        <button
                            className="w-full bg-white-500 hover:bg-gray-200 text-black font-bold py-4 px-4 rounded-full"
                            onClick={() => handleDeclineClick()}
                        >
                                Reject Sale
                        </button>
                    </div>
                  </div>
                  <div className="my-4 text-slate-500 text-lg leading-relaxed bg-neutral-300 rounded-3xl py-10 px-4">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <div className="relative py-6 flex-auto grid grid-cols-2 gap-4">
                        <div>
                        <div className='text-bezel-green'>
                            {watchDetails['name']} {watchDetails['brand_name']}<br/>
                            {watchDetails['reference_number']}
                        </div>
                        <div>
                            {watchDetails['condition']} / {watchDetails['manufacture_year']}
                        </div>
                        </div>
                        <div className='flex justify-end'>
                            <img
                                className = 'rounded-3xl bg-neutral-300 max-h-24'
                                src={watchDetails['image_url']}/>
                        </div>
                    </div>
                    <div className="flex-grow border-t border-gray-400 py-2"></div>
                    <div className='pt-4 pb-6'>
                        <div className='flow-root'>
                            <div className='float-left'>
                                Selling Price
                            </div>
                            <div className='float-right'>
                                ${(watchDetails['sale_price_cents']/100).toFixed(2)}
                            </div>
                        </div>

                        <div className='flow-root'>
                            <div className='float-left'>
                                Level 1 Commission ({(watchDetails['commission_rate_bips']/100).toFixed(2)}%)
                            </div>
                            <div className='float-right'>
                                ${((watchDetails['commission_rate_bips']/10000) * (watchDetails['sale_price_cents']/100)).toFixed(2)}
                            </div>
                        </div>

                        <div className='flow-root'>
                            <div className='float-left'>
                                Seller Fee
                            </div>
                            <div className='float-right'>
                                ${(watchDetails['seller_fee_cents']/100).toFixed(2)}
                            </div>
                        </div>

                        <div className='flow-root'>
                            <div className='float-left'>
                                Insured Shipping
                            </div>
                            <div className='float-right'>
                                Free
                            </div>
                        </div>

                        <div className='flow-root text-bezel-light-green'>
                            <div className='float-left'>
                                Bezel Authentication
                            </div>
                            <div className='float-right'>
                                Free
                            </div>
                        </div>
                    </div>
                    <div className="flex-grow border-t border-gray-400 py-2"></div>
                        <div className='flow-root'>
                            <div className='float-left font-bold text-bezel-green'>
                                Earnings
                            </div>
                            <div className='float-right font-bold text-bezel-green'>
                                ${(watchDetails['payout_amount_cents']/100).toFixed(2)}
                            </div>
                        </div>
                  </div>
                </div>
              </LoadingOverlay>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;