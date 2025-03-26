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
        <path
            d="M6 21C5.82821 20.9995 5.65946 20.9547 5.51 20.87C5.35553 20.7832 5.22691 20.6569 5.1373 20.504C5.04769 20.3511 5.00031 20.1772 5 20V5.33C4.98648 4.73032 5.20983 4.14946 5.62163 3.71332C6.03344 3.27718 6.60053 3.02089 7.2 3H16.8C17.3995 3.02089 17.9666 3.27718 18.3784 3.71332C18.7902 4.14946 19.0135 4.73032 19 5.33V20C18.9989 20.1745 18.9522 20.3457 18.8645 20.4966C18.7768 20.6475 18.6511 20.7727 18.5 20.86C18.348 20.9478 18.1755 20.994 18 20.994C17.8245 20.994 17.652 20.9478 17.5 20.86L11.83 17.65L6.5 20.85C6.34955 20.9434 6.17701 20.9951 6 21Z"
            fill="black"
        />
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
const Memo = memo(ForwardRef)
export default Memo
