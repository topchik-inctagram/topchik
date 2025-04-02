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
        <g clipPath="url(#clip0_3663_9525)">
            <path
                d="M11.809 0.479994H11.8982C14.0506 0.479994 16.0646 1.06847 17.7898 2.09279L17.737 2.06303C19.5331 3.11327 20.9875 4.56767 22.008 6.30815L22.0378 6.36383C23.0362 8.06207 23.6256 10.104 23.6256 12.2832C23.6256 17.473 20.2819 21.8832 15.6317 23.4749L15.5482 23.4998C15.4877 23.519 15.4186 23.5296 15.3475 23.5296C15.192 23.5296 15.048 23.4778 14.9318 23.3914L14.9338 23.3923C14.8109 23.2819 14.7341 23.1226 14.7341 22.945C14.7341 22.9402 14.7341 22.9354 14.7341 22.9315V22.9325C14.7341 22.9018 14.7366 22.5094 14.7418 21.7555C14.7469 21.0016 14.7494 20.3123 14.7494 19.6877C14.7562 19.6157 14.76 19.5331 14.76 19.4486C14.76 18.6883 14.4499 18.001 13.9498 17.5046C14.543 17.4461 15.0787 17.3482 15.599 17.2118L15.5261 17.2282C16.0762 17.0746 16.5562 16.8701 17.0016 16.6118L16.9718 16.6282C17.4595 16.3594 17.8723 16.0176 18.2122 15.6125L18.2179 15.6058C18.575 15.1488 18.8544 14.6112 19.0243 14.0266L19.033 13.993C19.2336 13.3373 19.3488 12.5837 19.3488 11.8032C19.3488 11.76 19.3488 11.7158 19.3478 11.6726V11.6794C19.3478 11.6582 19.3488 11.6342 19.3488 11.6102C19.3488 10.4122 18.8861 9.32256 18.1306 8.50944L18.1334 8.51231C18.2947 8.08991 18.3878 7.60223 18.3878 7.09247C18.3878 6.46943 18.2486 5.87999 18 5.35103L18.0106 5.37599C17.9002 5.35487 17.7744 5.34239 17.6448 5.34239C17.3242 5.34239 17.0218 5.41727 16.753 5.54975L16.7645 5.54495C16.2192 5.74655 15.7526 5.97503 15.313 6.24191L15.3494 6.22079L14.7648 6.58943C13.8797 6.33599 12.863 6.19007 11.8128 6.19007C10.7626 6.19007 9.74591 6.33599 8.78207 6.60863L8.85983 6.58943C8.69599 6.47679 8.47807 6.33823 8.20607 6.17375C7.84799 5.96831 7.42463 5.76959 6.98495 5.60255L6.92159 5.58143C6.64031 5.43359 6.30719 5.34719 5.95295 5.34719C5.83391 5.34719 5.71679 5.35679 5.60351 5.37599L5.61599 5.37407C5.37791 5.87711 5.23871 6.46751 5.23871 7.09055C5.23871 7.60031 5.33183 8.08896 5.50271 8.5392L5.49311 8.51136C4.73951 9.3216 4.27775 10.4112 4.27775 11.6093C4.27775 11.6333 4.27775 11.6582 4.27871 11.6822V11.6784C4.27775 11.7158 4.27775 11.759 4.27775 11.8032C4.27775 12.5798 4.39295 13.3306 4.60799 14.0371L4.59359 13.9824C4.77503 14.5997 5.05055 15.1363 5.40959 15.6077L5.40095 15.5952C5.74079 16.0128 6.15167 16.3565 6.61727 16.6147L6.63839 16.6253C7.05311 16.8672 7.53407 17.0717 8.03999 17.2147L8.08415 17.2253C8.53151 17.3453 9.06719 17.4432 9.61535 17.4979L9.65951 17.5018C9.24575 17.9126 8.97023 18.4618 8.90687 19.0742L8.90591 19.0858C8.70719 19.1827 8.47583 19.2614 8.23487 19.3123L8.21471 19.3162C7.96895 19.3651 7.68767 19.393 7.39871 19.393C7.37759 19.393 7.35647 19.393 7.33535 19.393H7.33823C6.95999 19.3853 6.61247 19.2624 6.32543 19.0589L6.33119 19.0627C5.97503 18.8141 5.68703 18.4915 5.48543 18.1162L5.47871 18.1018C5.28863 17.7792 5.03807 17.5123 4.74143 17.3078L4.73279 17.3021C4.51679 17.1398 4.26239 17.0131 3.98783 16.9373L3.97247 16.9334L3.66527 16.8874C3.64319 16.8854 3.61727 16.8845 3.59135 16.8845C3.45695 16.8845 3.32927 16.9114 3.21311 16.9584L3.21983 16.9555C3.13791 17.0016 3.11231 17.0605 3.14303 17.1322C3.18047 17.2147 3.22655 17.2858 3.28223 17.3482L3.28127 17.3472C3.33983 17.4163 3.40607 17.4768 3.47807 17.5296L3.48095 17.5315L3.58847 17.6083C3.86015 17.7504 4.08383 17.9482 4.25375 18.1872L4.25759 18.193C4.44095 18.4205 4.60223 18.6778 4.73183 18.9533L4.74143 18.9763L4.89503 19.3296C5.02463 19.7155 5.25983 20.0381 5.56703 20.2714L5.57183 20.2752C5.85983 20.4998 6.20735 20.6611 6.58655 20.7341L6.60191 20.736C6.91871 20.7974 7.28735 20.8358 7.66367 20.8435H7.67039C7.71359 20.8454 7.76351 20.8454 7.81439 20.8454C8.06495 20.8454 8.31071 20.8253 8.55071 20.7859L8.52479 20.7898L8.87807 20.7283C8.87807 21.1181 8.88063 21.5718 8.88575 22.0896C8.89087 22.6074 8.89343 22.8867 8.89343 22.9277V22.9411C8.89343 23.1187 8.81663 23.2781 8.69375 23.3885C8.57951 23.4739 8.43551 23.5258 8.27903 23.5258C8.20703 23.5258 8.13791 23.5152 8.07359 23.495L8.07839 23.496C3.34655 21.8746 0.00575256 17.4643 0.00575256 12.2736C0.00575256 10.0963 0.593273 8.05631 1.61951 6.30335L1.58879 6.35903C2.63903 4.56287 4.09343 3.10847 5.83391 2.08799L5.88959 2.05823C7.55903 1.06559 9.57119 0.479034 11.7197 0.479034H11.8138H11.809V0.479994ZM4.47455 17.4394C4.50527 17.3677 4.46943 17.3062 4.36703 17.255C4.26463 17.2243 4.19807 17.2346 4.16735 17.2858C4.13663 17.3574 4.17247 17.4189 4.27487 17.4701C4.36703 17.5315 4.43359 17.5213 4.47455 17.4394ZM4.95167 17.9626C5.02335 17.9114 5.01311 17.8294 4.92095 17.7168C4.81855 17.6246 4.73663 17.6093 4.67519 17.6707C4.60351 17.7219 4.61375 17.8038 4.70591 17.9165C4.80767 18.017 4.88959 18.032 4.95167 17.9616V17.9626ZM5.41247 18.6538C5.50463 18.5821 5.50463 18.4848 5.41247 18.3619C5.33055 18.2288 5.24351 18.1981 5.15135 18.2698C5.05919 18.321 5.05919 18.4131 5.15135 18.5462C5.24351 18.6794 5.33055 18.7152 5.41247 18.6538ZM6.05759 19.2998C6.13951 19.2179 6.11903 19.1206 5.99615 19.008C5.87327 18.8851 5.77087 18.8698 5.68895 18.9619C5.59679 19.0438 5.61727 19.1411 5.75039 19.2538C5.87327 19.3766 5.97567 19.3907 6.05759 19.296V19.2998ZM6.93407 19.6838C6.96479 19.5712 6.89823 19.4893 6.73439 19.4381C6.58079 19.3971 6.48351 19.433 6.44255 19.5456C6.40159 19.6582 6.46815 19.735 6.64223 19.776C6.79583 19.8381 6.89311 19.8074 6.93407 19.6838ZM7.90271 19.7606C7.90271 19.6275 7.81567 19.5712 7.64159 19.5917C7.47775 19.5917 7.39583 19.648 7.39583 19.7606C7.39583 19.8938 7.48287 19.9501 7.65695 19.9296C7.82079 19.9302 7.90271 19.8733 7.90271 19.7606ZM8.79455 19.607C8.77407 19.4944 8.68191 19.4483 8.51807 19.4688C8.35423 19.4995 8.28255 19.5763 8.30303 19.6992C8.32351 19.8221 8.41567 19.863 8.57951 19.8221C8.74335 19.7811 8.81439 19.7094 8.79455 19.607Z"
                fill="currentColor"
            />
        </g>
        <defs>
            <clipPath id="clip0_3663_9525">
                <rect width={24} height={24} fill="white" />
            </clipPath>
        </defs>
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
const Memo = memo(ForwardRef)
export default Memo
