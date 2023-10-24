import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import ReactToPrint from "react-to-print";


const CertDesign = () => {
    const router = useRouter();
    const [formData, setFormData] = useState(null);
    const componentRef = useRef();


    function convertToNairaWords(amount) {
        const words = [
            "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
            "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
            "seventeen", "eighteen", "nineteen"
        ];
        const tens = ["twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
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

        while (naira > 0) {
            let chunk = naira % 1000;
            naira = Math.floor(naira / 1000);

            if (chunk > 0) {
                if (chunk < 20) {
                    nairaString = words[chunk] + " " + scales[scaleIndex] + " " + nairaString;
                } else {
                    let ones = chunk % 10;
                    let tensIndex = Math.floor(chunk / 10) % 10;
                    let hundreds = Math.floor(chunk / 100);

                    if (ones === 0 && tensIndex === 0) {
                        nairaString = words[hundreds] + " hundred " + scales[scaleIndex] + " " + nairaString;
                    } else if (tensIndex === 0) {
                        nairaString = words[hundreds] + " hundred " + words[ones] + " " + scales[scaleIndex] + " " + nairaString;
                    } else if (tensIndex === 1) {
                        nairaString = words[hundreds] + " hundred " + words[chunk] + " " + scales[scaleIndex] + " " + nairaString;
                    } else {
                        nairaString = words[hundreds] + " hundred " + tens[tensIndex - 2] + " " + words[ones] + " " + scales[scaleIndex] + " " + nairaString;
                    }
                }
            }

            scaleIndex++;
        }

        if (kobo > 0) {
            if (kobo < 20) {
                koboString = words[kobo] + " kobo";
            } else {
                let ones = kobo % 10;
                let tensIndex = Math.floor(kobo / 10) % 10;

                if (ones === 0) {
                    koboString = tens[tensIndex - 2] + " kobo";
                } else {
                    koboString = tens[tensIndex - 2] + " " + words[ones] + " kobo";
                }
            }
        }

        return nairaString.trim() + " naira " + koboString.trim();
    }



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
    console.log("wordNum", wordNum);
    console.log(convertToNairaWords(100000.56));
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
                        <div className="mt-20">
                            <h4 className="text-right">ORIGINAL</h4>
                            <div className="">
                                <p className="font-bold text-center">{formData.subject}</p>
                                <p className="max-w-md text-sm max-w-prose text-justify">
                                    This is to certify that all PAYE and Withholding Taxes due to Kogi State Government for the period of
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
                                        size={120}
                                    />
                                </div>
                                <div>
                                    <hr />
                                    <p className="font-bold">Sule Salihu Enehe</p>
                                    <p>Executive Chairman</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: "10.2rem" }}>
                            <h4 className="text-right">DUPLICATE</h4>
                            <div className="mt-8">
                                <p className="font-bold text-center">{formData.subject}</p>
                                <p className="max-w-md text-sm max-w-prose text-justify">
                                    This is to certify that all PAYE and Withholding Taxes due to Kogi State Government for the period of
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
                                        size={120}
                                    />
                                </div>
                                <div>
                                    <hr />
                                    <p className="font-bold">Sule Salihu Enehe</p>
                                    <p>Executive Chairman</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CertDesign