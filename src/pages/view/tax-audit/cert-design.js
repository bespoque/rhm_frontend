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

    // function convertToNairaWords(amount) {
    //     const words = [
    //         "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    //         "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
    //         "seventeen", "eighteen", "nineteen"
    //     ];
    //     const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    //     const scales = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion"];

    //     if (amount === 0) return "zero naira";

    //     let nairaString = "";
    //     let koboString = "";

    //     if (amount < 0) {
    //         nairaString += "minus ";
    //         amount = Math.abs(amount);
    //     }

    //     let naira = Math.floor(amount);
    //     let kobo = Math.round((amount - naira) * 100);

    //     let scaleIndex = 0;
    //     let lastChunkWasZero = false;

    //     while (naira > 0) {
    //         let chunk = naira % 1000;
    //         naira = Math.floor(naira / 1000);
    //         console.log("chunk1", chunk);

    //         if (chunk > 0) {
    //             let chunkString = "";
    //             if (chunk < 20) {
    //                 chunkString = words[chunk] ;
    //                 console.log("chunk2", chunk);
    //             } else {
    //                 let ones = chunk % 10;
    //                 let tensIndex = Math.floor(chunk / 10) % 10;
    //                 let hundreds = Math.floor(chunk / 100);

    //                 if (hundreds > 0) {
    //                     chunkString += words[hundreds] + " hundred";
    //                     if (tensIndex > 0 || ones > 0) {
    //                         chunkString += " and " ;
    //                     }
    //                 }

    //                 if (tensIndex > 0) {
    //                     chunkString += tens[tensIndex];
    //                     if (ones > 0) {
    //                         chunkString += "-";
    //                     }
    //                 }
                    
    //                 if (ones > 0) {
    //                     chunkString += words[ones] ;
    //                 }
    //             }
                
    //             if (scaleIndex > 0 && chunkString) {
    //                 if (lastChunkWasZero) {
    //                     nairaString = chunkString + " " + scales[scaleIndex] + " and " + nairaString;
    //                 } else {
    //                     nairaString = chunkString + " " + scales[scaleIndex] + ", " + nairaString;
    //                 }
    //             } else {
    //                 nairaString = chunkString + " " + scales[scaleIndex] + " " + nairaString;
    //             }
    //             lastChunkWasZero = false;
    //         } else {
    //             lastChunkWasZero = true;
    //         }
            
    //         scaleIndex++;
    //     }
        
    //     if (kobo > 0) {
    //         if (kobo < 20) {
    //             koboString = words[kobo] + " kobo";
    //         } else {
    //             let ones = kobo % 10;
    //             let tensIndex = Math.floor(kobo / 10) % 10;

    //             if (tensIndex === 0) {
    //                 koboString = words[ones] + " kobo";
    //             } else {
    //                 koboString = tens[tensIndex] + (ones > 0 ? "-" : "") + words[ones] + " kobo";
    //             }
    //         }
    //     }

    //     return nairaString.trim() + " naira " + koboString.trim() + " only";
    // }


    
    function convertNumber(number) {
        let [integer, fraction] = number.toString().split('.');
    
        let output = '';
    
        if (integer.charAt(0) === '-') {
            output = 'negative ';
            integer = integer.slice(1);
        } else if (integer.charAt(0) === '+') {
            output = 'positive ';
            integer = integer.slice(1);
        }
    
        if (integer.charAt(0) === '0') {
            output += 'zero';
        } else {
            integer = integer.padStart(36, '0');
            const group = integer.match(/.{1,3}/g).join(' ');
            const groups = group.split(' ');
    
            const groups2 = groups.map(g => convertThreeDigit(g.charAt(0), g.charAt(1), g.charAt(2)))
    
            for (let z = 0; z < groups2.length; z++) {
                if (groups2[z] !== '') {
                    output += groups2[z] + convertGroup(11 - z) + (z < 11 && groups2.slice(z + 1, -1).indexOf('') === -1 && groups2[11] !== '' && groups[11].charAt(0) === '0' ? ' and ' : ', ');
                }
            }
    
            output = output.replace(/, $/, '');
        }
    
        if (fraction > 0) {
            output += ' point';
            for (let i = 0; i < fraction.length; i++) {
                output += ' ' + convertDigit(fraction.charAt(i));
            }
        }
    
        return output;
    }
    
    function convertGroup(index) {
        switch (index) {
            case 11:
                return ' decillion';
            case 10:
                return ' nonillion';
            case 9:
                return ' octillion';
            case 8:
                return ' septillion';
            case 7:
                return ' sextillion';
            case 6:
                return ' quintrillion';
            case 5:
                return ' quadrillion';
            case 4:
                return ' trillion';
            case 3:
                return ' billion';
            case 2:
                return ' million';
            case 1:
                return ' thousand';
            case 0:
                return '';
        }
    }
    
    function convertThreeDigit(digit1, digit2, digit3) {
        let buffer = '';
    
        if (digit1 === '0' && digit2 === '0' && digit3 === '0') {
            return '';
        }
    
        if (digit1 !== '0') {
            buffer += convertDigit(digit1) + ' hundred';
            if (digit2 !== '0' || digit3 !== '0') {
                buffer += ' and ';
            }
        }
    
        if (digit2 !== '0') {
            buffer += convertTwoDigit(digit2, digit3);
        } else {
            if (digit3 !== '0') {
                buffer += convertDigit(digit3);
            }
        }
    
        return buffer;
    }
    
    function convertTwoDigit(digit1, digit2) {
        if (digit2 === '0') {
            switch (digit1) {
                case '1':
                    return 'ten';
                case '2':
                    return 'twenty';
                case '3':
                    return 'thirty';
                case '4':
                    return 'forty';
                case '5':
                    return 'fifty';
                case '6':
                    return 'sixty';
                case '7':
                    return 'seventy';
                case '8':
                    return 'eighty';
                case '9':
                    return 'ninety';
            }
        } else {
            if (digit1 === '1') {
                switch (digit2) {
                    case '1':
                        return 'eleven';
                    case '2':
                        return 'twelve';
                    case '3':
                        return 'thirteen';
                    case '4':
                        return 'fourteen';
                    case '5':
                        return 'fifteen';
                    case '6':
                        return 'sixteen';
                    case '7':
                        return 'seventeen';
                    case '8':
                        return 'eighteen';
                    case '9':
                        return 'nineteen';
                }
            } else {
                const temp = convertDigit(digit2);
                switch (digit1) {
                    case '2':
                        return 'twenty-' + temp;
                    case '3':
                        return 'thirty-' + temp;
                    case '4':
                        return 'forty-' + temp;
                    case '5':
                        return 'fifty-' + temp;
                    case '6':
                        return 'sixty-' + temp;
                    case '7':
                        return 'seventy-' + temp;
                    case '8':
                        return 'eighty-' + temp;
                    case '9':
                        return 'ninety-' + temp;
                }
            }
        }
    }
    
    function convertDigit(digit) {
        switch (digit) {
            case '0':
                return 'zero';
            case '1':
                return 'one';
            case '2':
                return 'two';
            case '3':
                return 'three';
            case '4':
                return 'four';
            case '5':
                return 'five';
            case '6':
                return 'six';
            case '7':
                return 'seven';
            case '8':
                return 'eight';
            case '9':
                return 'nine';
        }
    }
    
    // Example usage:
    function convertToNairaAndKobo(number) {
        const nairaAmount = Math.floor(number);
        const koboAmount = Math.round((number - nairaAmount) * 100);
    
        const nairaWords = convertNumber(nairaAmount);
        const koboWords = convertNumber(koboAmount);
    
        let result = nairaWords + " Naira";
    
        if (koboAmount > 0) {
            result += ` and ${koboWords} Kobo`;
        }
    
        return result;
    }
    
    // Example usage:
    const amount = 1234567.89;
    const words = convertToNairaAndKobo(amount);
    console.log(words); // Outputs "one million two hundred thirty-four thousand five hundred sixty-seven Naira and eighty-nine Kobo"
    
    


    useEffect(() => {
        if (router.query.formData) {
            setFormData(JSON.parse(router.query.formData));
        }
    }, [router.query.formData]);

    if (!formData) {
        return <div>Loading...</div>;
    }
    const wordNum = (formData.amount).replace(/,/g, '')
    const numberInWords = convertToNairaAndKobo(wordNum);

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