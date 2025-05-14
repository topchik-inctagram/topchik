import { SVGProps, Ref, forwardRef, memo } from "react"
const SvgComponent = (
    props: SVGProps<SVGSVGElement>,
    ref: Ref<SVGSVGElement>
) => (
    <svg
        width={48}
        height={48}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
    >
        <g clipPath="url(#clip0_16760_14523)">
            <path
              d="M27.6598 38.0001C27.361 38.0011 27.0658 37.9351 26.7959 37.8071C26.5259 37.679 26.2881 37.4921 26.0998 37.2601L16.4398 25.2601C16.1457 24.9022 15.9849 24.4533 15.9849 23.9901C15.9849 23.5268 16.1457 23.0779 16.4398 22.7201L26.4398 10.7201C26.7793 10.3116 27.2671 10.0548 27.796 10.006C28.3248 9.95726 28.8514 10.1206 29.2598 10.4601C29.6683 10.7995 29.9251 11.2874 29.9739 11.8162C30.0226 12.3451 29.8593 12.8716 29.5198 13.2801L20.5798 24.0001L29.2198 34.7201C29.4644 35.0136 29.6198 35.3711 29.6675 35.7502C29.7153 36.1293 29.6534 36.5142 29.4893 36.8592C29.3252 37.2043 29.0657 37.4951 28.7415 37.6973C28.4173 37.8995 28.0419 38.0045 27.6598 38.0001Z"
              fill="white"
            />
        </g>
        <defs>
            <clipPath id="clip0_301_4118">
                <rect width='48' height='48' fill="white" />
            </clipPath>
        </defs>
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
const Memo = memo(ForwardRef)
export default Memo
