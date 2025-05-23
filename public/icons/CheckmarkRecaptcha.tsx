import { SVGProps, Ref, forwardRef, memo } from "react"
const SvgComponent = (
    props: SVGProps<SVGSVGElement>,
    ref: Ref<SVGSVGElement>
) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="19" viewBox="0 0 25 19" fill="none">
<path d="M22.0355 0.749512C22.8113 1.49441 23.5691 2.25975 24.3387 3.01177V3.01272C19.0046 8.34204 13.671 13.6728 8.3341 19.0002C5.56224 16.2222 2.78041 13.436 0.0147363 10.6642L0 10.6656V10.6509C0.0656004 10.6651 0.0646496 10.5411 0.126922 10.5221C0.841871 9.80664 1.55159 9.08551 2.26701 8.37009C4.29112 10.3904 6.31237 12.414 8.33457 14.4362C12.9033 9.87557 17.4716 5.31492 22.0355 0.749512Z" fill="#19983B" fill-opacity="0.901702"/>
</svg>
)
const ForwardRef = forwardRef(SvgComponent)
const Memo = memo(ForwardRef)
export default Memo
