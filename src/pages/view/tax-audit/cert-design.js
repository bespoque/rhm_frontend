import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { shallowEqual, useSelector } from "react-redux";
import ReactToPrint from "react-to-print";
import jwt from "jsonwebtoken";


const CertDesign = () => {
    const router = useRouter();
    const [formData, setFormData] = useState(null);
    const componentRef = useRef();

    const { auth } = useSelector(
        (state) => ({
          auth: state.authentication.auth,
        }),
        shallowEqual
      );

      const decoded = jwt.decode(auth);
      const staff = decoded.staffName

      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      const formattedDateTime = new Date().toLocaleDateString(undefined, options);

      function convertToNairaWords(amount) {
        const words = [
            "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
            "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
            "seventeen", "eighteen", "nineteen"
        ];
        const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
        const scales = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion"];
    
        if (amount === 0) return "zero naira";
    
        let nairaString = "";
        let koboString = "";
    
        if (amount < 0) {
            nairaString += "minus ";
            amount = Math.abs(amount);
        }
    
        let naira = Math.floor(amount);
        let kobo = Math.round((amount - naira) * 100);
    
        let scaleIndex = 0;
        let lastChunkWasZero = false;
    
        while (naira > 0) {
            let chunk = naira % 1000;
            naira = Math.floor(naira / 1000);
    
            if (chunk > 0) {
                let chunkString = "";
                if (chunk < 20) {
                    chunkString = words[chunk];
                } else {
                    let ones = chunk % 10;
                    let tensIndex = Math.floor(chunk / 10) % 10;
                    let hundreds = Math.floor(chunk / 100);
    
                    if (hundreds > 0) {
                        chunkString += words[hundreds] + " hundred";
                        if (tensIndex > 0 || ones > 0) {
                            chunkString += " and ";
                        }
                    }
    
                    if (tensIndex > 0) {
                        chunkString += tens[tensIndex];
                        if (ones > 0) {
                            chunkString += "-";
                        }
                    }
    
                    if (ones > 0) {
                        chunkString += words[ones];
                    }
                }
    
                if (scaleIndex > 0 && chunkString) {
                    if (lastChunkWasZero) {
                        nairaString = chunkString + " " + scales[scaleIndex] + " and " + nairaString;
                    } else {
                        nairaString = chunkString + " " + scales[scaleIndex] + ", " + nairaString;
                    }
                } else {
                    nairaString = chunkString + " " + scales[scaleIndex] + " " + nairaString;
                }
                lastChunkWasZero = false;
            } else {
                lastChunkWasZero = true;
            }
    
            scaleIndex++;
        }
    
        if (kobo > 0) {
            if (kobo < 20) {
                koboString = words[kobo] + " kobo";
            } else {
                let ones = kobo % 10;
                let tensIndex = Math.floor(kobo / 10) % 10;
    
                if (tensIndex === 0) {
                    koboString = words[ones] + " kobo";
                } else {
                    koboString = tens[tensIndex] + " " + words[ones] + " kobo";
                }
            }
        }
    
        return nairaString.trim() + " naira " + koboString.trim() + " only";
    }
    
    
    
    
    

    console.log("Num", convertToNairaWords("51013917.90"));

    
    useEffect(() => {
        if (router.query.formData) {
            setFormData(JSON.parse(router.query.formData));
        }
    }, [router.query.formData]);

    if (!formData) {
        return <div>Loading...</div>;
    }
    const wordNum = (formData.amount).replace(/,/g, '')
    const numberInWords = convertToNairaWords(wordNum);

    return (
        <>
            <div className="flex justify-between my-3">
                <button className="btn bg-green-600 btn-default text-white
                                btn-outlined bg-transparent rounded-md"
                    type="submit"
                    onClick={() => router.back()}
                >
                    Back
                </button>
                <div>
                    <ReactToPrint
                        trigger={() => <button className="btn w-32 bg-green-600 btn-default text-white
                                        btn-outlined bg-transparent rounded-md"
                            type="submit"
                        >
                            Print
                        </button>}
                        content={() => componentRef.current}
                    />
                </div>
            </div>
            <div>
                <div className="flex justify-center " ref={componentRef}>
                    <div className="w-2/3">
                        <div className="mt-32">
                            <h4 className="text-right font-bold">ORIGINAL</h4>
                            <div className="mt-5">
                                <p className="font-bold text-center">{formData.subject}</p>
                                <p className="max-w-md text-sm max-w-prose text-justify">
                                    This is to certify that all Withholding Taxes due to Kogi State Government for the period of
                                    January {new Date(formData.sdate).getFullYear()} to December <span>
                                        {!formData.edate ?
                                            new Date(formData.sdate).getFullYear() :
                                            new Date(formData.edate).getFullYear()
                                        }
                                    </span> have been reconciled, agreed and paid with the details below;
                                </p>
                            </div>
                            <div className="mt-3">
                                <div className="grid grid-cols-6 gap-2">
                                    <p className="font-bold ">Taxpayer:</p>
                                    <p className="col-span-2">{formData.fullname}</p>
                                </div>
                                <div className="grid grid-cols-6 gap-2">
                                    <p className="font-bold">Address:</p>
                                    <div className="col-span-3">
                                        <p className=""> {formData.address} </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 gap-2">
                                    <p className="font-bold">Audit Year:</p>
                                    <p className="">
                                        {
                                            new Date(formData.sdate).getFullYear() === new Date(formData.edate).getFullYear() || !formData.edate ?
                                                new Date(formData.sdate).getFullYear() : `${new Date(formData.sdate).getFullYear()} - ${new Date(formData.edate).getFullYear()}`
                                        }
                                    </p>
                                </div>
                                <div className="grid grid-cols-6 gap-2">
                                    <p className="font-bold">Amount:</p>
                                    <div className="col-span-3">
                                        <p className=""> {formData.amount} </p>
                                        <small>
                                            {`(${numberInWords} only)`}
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between mt-4">
                                <div>
                                    <QRCode
                                        value={`${formData.fullname} ${formData.amount} ${formData.kgtin}`}
                                        size={80}
                                    />
                                </div>
                                <div>
                                    <hr />
                                    <p className="font-bold">Sule Salihu Enehe</p>
                                    <p>Executive Chairman</p>
                                </div>
                            </div>
                            <div class="flex justify-end"><small>{'<<'} Printed by {staff} on {formattedDateTime} {'>>'}</small></div>
                        </div>

                        <div style={{ marginTop: "10.2rem" }}>
                            <h4 className="text-right font-bold">DUPLICATE</h4>
                            <div className="mt-5">
                                <p className="font-bold text-center">{formData.subject}</p>
                                <p className="max-w-md text-sm max-w-prose text-justify">
                                    This is to certify that all Withholding Taxes due to Kogi State Government for the period of
                                    January {new Date(formData.sdate).getFullYear()} to December <span>
                                        {!formData.edate ?
                                            new Date(formData.sdate).getFullYear() :
                                            new Date(formData.edate).getFullYear()
                                        }
                                    </span> have been reconciled, agreed and paid with the details below;
                                </p>
                            </div>
                            <div className="mt-3">
                                <div className="grid grid-cols-6 gap-2">
                                    <p className="font-bold ">Taxpayer:</p>
                                    <p className="col-span-2">{formData.fullname}</p>
                                </div>
                                <div className="grid grid-cols-6 gap-2">
                                    <p className="font-bold">Address:</p>
                                    <div className="col-span-3">
                                        <p className=""> {formData.address} </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 gap-2">
                                    <p className="font-bold">Audit Year:</p>

                                    <p className="">
                                        {
                                            new Date(formData.sdate).getFullYear() === new Date(formData.edate).getFullYear() || !formData.edate ?
                                                new Date(formData.sdate).getFullYear() : `${new Date(formData.sdate).getFullYear()} - ${new Date(formData.edate).getFullYear()}`
                                        }
                                    </p>
                                </div>
                                <div className="grid grid-cols-6 gap-2">
                                    <p className="font-bold">Amount:</p>
                                    <div className="col-span-3">
                                        <p className=""> {formData.amount} </p>
                                        <small>
                                            {`(${numberInWords} only)`}
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between mt-4">
                                <div>
                                    <QRCode
                                        value={`${formData.fullname} ${formData.amount} ${formData.kgtin}`}
                                        size={80}
                                    />
                                </div>
                                <div>
                                    <hr />
                                    <p className="font-bold">Sule Salihu Enehe</p>
                                    <p>Executive Chairman</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-end"><small>{'<<'} Printed by {staff} on {formattedDateTime} {'>>'}</small></div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CertDesign