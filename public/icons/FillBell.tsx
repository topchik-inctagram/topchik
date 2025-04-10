import { SVGProps, Ref, forwardRef, memo } from "react"
const SvgComponent = (
    props: SVGProps<SVGSVGElement>,
    ref: Ref<SVGSVGElement>
) => (
    <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
    >
        <g id="Fill bell">
            <path
                id="Mask"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 18.3413C14 19.2403 13.084 20.0003 12 20.0003C10.916 20.0003 10 19.2403 10 18.3413V18.0003H14V18.3413ZM20.521 15.2073L18.72 13.4043V8.93629C18.72 5.45529 16.218 2.49929 12.899 2.05929C10.978 1.80429 9.038 2.39029 7.583 3.66629C6.119 4.94829 5.28 6.79329 5.28 8.72729L5.279 13.4043L3.479 15.2083C3.01 15.6773 2.871 16.3773 3.125 16.9903C3.38 17.6033 3.973 18.0003 4.637 18.0003H8V18.3413C8 20.3593 9.794 22.0003 12 22.0003C14.206 22.0003 16 20.3593 16 18.3413V18.0003H19.362C20.026 18.0003 20.619 17.6043 20.873 16.9903C21.128 16.3773 20.989 15.6773 20.521 15.2073Z"
                fill="black"
            />
            <mask
                id="mask0_10881_17319"
                style={{
                    maskType: "luminance",
                }}
                maskUnits="userSpaceOnUse"
                x={2}
                y={2}
                width={19}
                height={21}
            >
                <path
                    id="Mask_2"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14 18.3413C14 19.2403 13.084 20.0003 12 20.0003C10.916 20.0003 10 19.2403 10 18.3413V18.0003H14V18.3413ZM20.521 15.2073L18.72 13.4043V8.93629C18.72 5.45529 16.218 2.49929 12.899 2.05929C10.978 1.80429 9.038 2.39029 7.583 3.66629C6.119 4.94829 5.28 6.79329 5.28 8.72729L5.279 13.4043L3.479 15.2083C3.01 15.6773 2.871 16.3773 3.125 16.9903C3.38 17.6033 3.973 18.0003 4.637 18.0003H8V18.3413C8 20.3593 9.794 22.0003 12 22.0003C14.206 22.0003 16 20.3593 16 18.3413V18.0003H19.362C20.026 18.0003 20.619 17.6043 20.873 16.9903C21.128 16.3773 20.989 15.6773 20.521 15.2073Z"
                    fill="white"
                />
            </mask>
            <g mask="url(#mask0_10881_17319)">
                <g id="&#240;&#159;&#142;&#168; Color">
                    <rect id="Base" width={24} height={24} fill="black" />
                </g>
            </g>
        </g>
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
const Memo = memo(ForwardRef)
export default Memo
