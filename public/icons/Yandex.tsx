import { SVGProps, Ref, forwardRef, memo } from "react"
const SvgComponent = (
    props: SVGProps<SVGSVGElement>,
    ref: Ref<SVGSVGElement>
) => (
    <svg
        width={36}
        height={36}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
    >
        <g clipPath="url(#clip0_26444_7704)">
            <path
                d="M18 35C27.3888 35 35 27.3888 35 18C35 8.61116 27.3888 1 18 1C8.61116 1 1 8.61116 1 18C1 27.3888 8.61116 35 18 35Z"
                stroke="white"
                strokeWidth={2}
            />
            <path
                d="M9.6375 7.13101L6.456 10.3125L15.756 19.6133V30.6698H20.256V19.6013L29.5448 10.3125L26.3633 7.13101L18 15.4943L9.6375 7.13101Z"
                fill="white"
            />
        </g>
        <defs>
            <clipPath id="clip0_26444_7704">
                <rect width={36} height={36} fill="white" />
            </clipPath>
        </defs>
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
const Memo = memo(ForwardRef)
export default Memo
