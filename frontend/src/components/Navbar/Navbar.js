import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import NavItem from './NavItem'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import {logoutUser} from '../../redux/actions/authActions';
const navigation = [

  { name: 'Individual', href: '/individual-profile' },
  { name: 'Enterprise', href: '/profile' },
  // { name: 'Sign in', href: '/signin' },
  
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

  const [tokenData,setTokenData]=useState(null);
  const search={
    border: '1px solid #c1c1c1',
    padding: '2px 9px',
    borderRadius: '5px'
};


useEffect(() => {
  const token = localStorage.getItem('jwtToken');
  console.log(token)
     setTokenData(token);
},[tokenData]); 
 

const searchDiv={
 alignItems:'center'
};
const searchInput={
  border:'none',
  outline: 'none'
 };
 const dispatch = useDispatch()

 const handleLogout =async  () => {
 
    dispatch(logoutUser());
    window.location.href = '/';
}
  return (
    <Disclosure as="nav" className="bg-white w-full">
      {({ open }) => (
        <>
          <div className="w-full flex h-20 items-center justify-between">
            <div className="flex  items-center">
              <div className="items-center">
                <Link to="/">
                  <svg width="203" height="55" viewBox="0 0 821 223" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M247.561 140.163L276.313 48.8274H298.796L327.547 140.163H311.766L285.609 58.2312H289.068L263.342 140.163H247.561ZM263.667 120.383V106.115H311.55V120.383H263.667Z" fill="#232323" />
                    <path d="M338.789 140.163V71.7419H352.408V92.9275H354.246V140.163H338.789ZM386.348 140.163V107.195C386.348 105.034 386.24 102.656 385.916 100.061C385.592 97.4673 384.943 94.8731 383.862 92.4951C382.781 90.1172 381.16 88.0635 378.998 86.5502C376.836 85.037 374.026 84.1722 370.351 84.1722C368.405 84.1722 366.46 84.4965 364.622 85.145C362.677 85.7936 360.947 86.8745 359.434 88.3877C357.921 89.901 356.624 92.0628 355.759 94.765C354.786 97.4673 354.354 100.926 354.354 105.034L345.274 101.142C345.274 95.3055 346.355 90.0091 348.625 85.2531C350.895 80.4972 354.246 76.7141 358.569 73.9037C363.001 71.0934 368.405 69.6882 374.783 69.6882C379.863 69.6882 384.078 70.5529 387.321 72.1743C390.564 73.9037 393.266 76.0655 395.212 78.6597C397.157 81.2538 398.562 84.0642 399.535 86.9826C400.508 89.901 401.048 92.7113 401.373 95.4136C401.697 98.0077 401.805 100.17 401.805 101.899V140.163H386.348Z" fill="#232323" />
                    <path d="M437.366 142.109C432.394 142.109 428.287 141.136 424.828 139.299C421.369 137.461 418.775 134.867 417.046 131.732C415.316 128.598 414.451 125.139 414.451 121.356C414.451 118.113 414.992 115.087 416.073 112.492C417.154 109.898 418.883 107.52 421.153 105.683C423.423 103.737 426.341 102.224 430.016 100.927C432.719 100.062 435.961 99.1974 439.636 98.5488C443.311 97.7922 447.311 97.1437 451.634 96.6032C455.958 95.9547 460.498 95.3062 465.254 94.6576L459.849 97.7922C459.849 93.0363 458.876 89.5774 456.715 87.3075C454.553 85.0376 450.878 83.9567 445.797 83.9567C442.663 83.9567 439.744 84.7134 436.826 86.1185C433.908 87.5237 431.962 90.0098 430.773 93.5767L416.829 89.2531C418.559 83.4163 421.693 78.7684 426.449 75.3096C431.205 71.8507 437.583 70.0132 445.689 70.0132C451.742 70.0132 457.147 70.986 461.795 73.0397C466.443 74.9853 469.901 78.228 472.063 82.7678C473.252 85.1457 474.009 87.6318 474.333 90.1179C474.549 92.6039 474.765 95.4143 474.765 98.3327V140.163H461.362V125.355L463.632 127.733C460.498 132.705 456.931 136.272 452.823 138.65C448.716 140.92 443.528 142.109 437.366 142.109ZM440.393 129.895C443.852 129.895 446.77 129.246 449.256 128.057C451.742 126.868 453.688 125.355 455.093 123.518C456.498 121.788 457.579 120.059 458.012 118.545C458.768 116.6 459.309 114.33 459.417 111.844C459.525 109.358 459.525 107.304 459.525 105.683L464.173 107.088C459.525 107.845 455.634 108.493 452.283 109.034C448.932 109.574 446.122 110.114 443.744 110.547C441.366 111.087 439.312 111.52 437.475 112.168C435.745 112.817 434.232 113.573 432.935 114.438C431.746 115.303 430.773 116.276 430.124 117.356C429.476 118.437 429.152 119.734 429.152 121.248C429.152 122.977 429.584 124.382 430.449 125.679C431.313 126.976 432.502 127.949 434.124 128.706C436.069 129.571 438.015 129.895 440.393 129.895Z" fill="#232323" />
                    <path d="M492.6 140.162V46.989H507.841V140.162H492.6Z" fill="#232323" />
                    <path d="M535.836 170.644L549.023 134.434L549.239 145.135L519.406 71.7417H535.296L556.481 126.003H552.374L573.019 71.7417H588.26L550.104 170.644H535.836Z" fill="#232323" />
                    <path d="M595.286 83.7405V71.7425H643.061V83.7405H595.286ZM642.953 140.163C638.413 141.028 633.982 141.352 629.658 141.244C625.334 141.136 621.443 140.379 617.984 138.866C614.525 137.353 611.931 134.975 610.202 131.732C608.689 128.814 607.824 125.787 607.716 122.653C607.608 119.518 607.608 116.059 607.608 112.168V52.7188H622.848V111.411C622.848 114.114 622.848 116.6 622.957 118.653C623.065 120.707 623.497 122.437 624.254 123.734C625.767 126.22 628.253 127.733 631.496 127.949C634.846 128.273 638.63 128.057 642.953 127.409V140.163Z" fill="#232323" />
                    <path d="M659.058 61.3656V47.314H674.299V61.3656H659.058ZM659.058 140.163V71.7422H674.299V140.163H659.058Z" fill="#232323" />
                    <path d="M723.047 142.108C716.022 142.108 709.969 140.487 704.996 137.352C700.024 134.218 696.241 129.894 693.539 124.49C690.945 119.085 689.54 112.816 689.54 106.006C689.54 98.9807 690.945 92.8195 693.647 87.307C696.349 81.9025 700.24 77.5789 705.321 74.5524C710.401 71.4178 716.346 69.9045 723.264 69.9045C731.046 69.9045 737.64 71.8502 743.044 75.7414C748.448 79.6326 751.907 85.0371 753.637 91.7386L738.396 95.8461C737.207 92.171 735.262 89.2526 732.451 87.307C729.749 85.2533 726.614 84.2805 723.047 84.2805C719.048 84.2805 715.805 85.2533 713.211 87.0908C710.617 88.9283 708.78 91.5225 707.482 94.8732C706.294 98.224 705.645 101.899 705.645 106.115C705.645 112.6 707.05 117.896 709.969 121.896C712.887 125.895 717.211 127.949 722.939 127.949C727.047 127.949 730.181 126.976 732.559 125.138C734.937 123.301 736.667 120.599 737.856 117.14L753.421 120.599C751.259 127.624 747.584 132.921 742.287 136.704C737.207 140.271 730.722 142.108 723.047 142.108Z" fill="#232323" />
                    <path d="M792.765 142.108C784.334 142.108 777.417 140.163 772.12 136.38C766.824 132.597 763.581 127.192 762.5 120.382L778.065 118.004C778.822 121.355 780.659 124.057 783.361 126.003C786.064 127.949 789.523 128.921 793.738 128.921C797.413 128.921 800.223 128.165 802.277 126.76C804.331 125.355 805.304 123.301 805.304 120.815C805.304 119.302 804.979 118.004 804.223 117.032C803.466 116.059 801.845 115.194 799.359 114.221C796.873 113.357 793.09 112.168 787.901 110.871C782.172 109.357 777.633 107.736 774.174 106.006C770.823 104.277 768.337 102.223 766.932 99.7373C765.419 97.3593 764.662 94.4409 764.662 90.982C764.662 86.7665 765.743 82.9834 768.013 79.8488C770.283 76.7142 773.417 74.2281 777.417 72.4987C781.416 70.7693 786.172 69.9045 791.576 69.9045C796.873 69.9045 801.629 70.7693 805.736 72.3906C809.843 74.012 813.194 76.3899 815.68 79.4164C818.166 82.4429 819.788 86.0099 820.328 90.1173L804.763 92.9276C804.331 90.0092 803.034 87.7393 800.764 86.0099C798.494 84.2805 795.468 83.4157 791.684 83.1996C788.117 82.9834 785.199 83.5238 783.037 84.8209C780.875 86.118 779.795 87.9555 779.795 90.2254C779.795 91.5225 780.227 92.6034 781.092 93.5762C781.956 94.549 783.794 95.4137 786.496 96.3865C789.198 97.3593 793.198 98.4402 798.494 99.8454C803.899 101.251 808.33 102.872 811.573 104.601C814.816 106.439 817.194 108.493 818.707 111.087C820.22 113.681 820.869 116.599 820.869 120.166C820.869 127.084 818.383 132.488 813.302 136.38C808.546 140.163 801.629 142.108 792.765 142.108Z" fill="#232323" />
                    <path d="M135.364 186.425H35.7054C16.2492 186.425 0.46814 170.644 0.46814 151.187V51.6369C0.46814 32.1807 16.2492 16.3997 35.7054 16.3997H135.364C154.82 16.3997 170.601 32.1807 170.601 51.6369V151.296C170.601 170.644 154.82 186.425 135.364 186.425Z" fill="#8748FF" />
                    <path d="M108.125 81.4696C106.396 80.1725 104.45 79.6321 102.397 79.6321C98.9378 79.6321 95.3708 80.8211 91.6958 83.7395C88.0207 86.6579 84.1295 93.2514 82.0758 96.8183C82.0758 96.8183 84.4538 89.252 84.4538 86.8741C84.4538 84.1718 84.0214 82.8748 82.5082 81.4696C80.9949 80.0644 79.1574 79.3078 76.1309 79.1997C74.1853 79.1997 72.0235 79.6321 70.9426 80.1725C69.7536 80.8211 67.6999 82.4424 68.1322 85.1446C68.4565 87.5226 70.294 87.1983 70.294 90.1168C70.294 90.7653 69.9698 92.0624 69.5374 93.2514C69.5374 93.2514 64.1329 106.33 61.3226 114.545C60.566 116.923 59.8093 118.977 60.566 120.814C61.9711 124.381 71.3749 124.814 73.9691 118.869C77.3199 111.086 79.4817 102.979 82.5082 98.4397C85.5347 94.008 89.4259 89.4682 92.1281 88.7116C93.8576 88.2792 95.587 88.9278 95.2627 91.5219C94.8304 95.5212 86.3994 110.221 87.2641 117.031C87.9127 122.111 92.3443 123.192 94.8304 123.192C98.8297 123.192 100.775 122.436 104.342 119.733C108.45 116.707 103.261 119.733 101.964 119.085C100.667 118.436 100.991 116.058 102.721 111.843C103.045 111.194 110.395 93.6837 110.72 87.6307C110.936 84.8204 109.855 82.6586 108.125 81.4696Z" fill="#00FF00" />
                    <path d="M128.122 6.23889V29.0458C128.122 32.0723 125.636 34.5584 122.609 34.5584C119.583 34.5584 117.097 32.0723 117.097 29.0458V6.23889C117.097 3.21238 119.583 0.726318 122.609 0.726318C125.636 0.726318 128.122 3.21238 128.122 6.23889Z" fill="#8748FF" />
                    <path d="M53.9725 6.23889V29.0458C53.9725 32.0723 51.4865 34.5584 48.46 34.5584C45.4335 34.5584 42.9474 32.0723 42.9474 29.0458V6.23889C42.9474 3.21238 45.4335 0.726318 48.46 0.726318C51.4865 0.726318 53.9725 3.21238 53.9725 6.23889Z" fill="#8748FF" />
                    <path d="M212.108 58.1221V144.594C212.108 148.917 207.136 151.295 203.785 148.701L181.302 130.218L147.038 100.926L181.302 72.6062L203.677 54.2309C207.136 51.4206 212.108 53.7986 212.108 58.1221Z" fill="#8748FF" />
                    <path d="M44.2444 41.8H20.0323V66.0121H44.2444V41.8Z" fill="white" />
                    <path d="M98.073 41.8H73.861V66.0121H98.073V41.8Z" fill="white" />
                    <path d="M151.902 41.8H127.69V66.0121H151.902V41.8Z" fill="white" />
                    <path d="M44.2444 86.9814H20.0323V111.194H44.2444V86.9814Z" fill="white" />
                    <path d="M151.902 86.9814H127.69V111.194H151.902V86.9814Z" fill="white" />
                    <path d="M44.2444 132.055H20.0323V156.267H44.2444V132.055Z" fill="white" />
                    <path d="M98.073 132.055H73.861V156.267H98.073V132.055Z" fill="white" />
                    <path d="M149.956 222.418C174.252 222.418 193.949 202.722 193.949 178.426C193.949 154.129 174.252 134.433 149.956 134.433C125.66 134.433 105.964 154.129 105.964 178.426C105.964 202.722 125.66 222.418 149.956 222.418Z" fill="#8748FF" />
                    <path d="M116.016 161.347C116.232 161.023 116.34 160.699 116.556 160.374C117.097 159.401 117.637 158.429 118.286 157.456C118.502 157.132 118.718 156.699 119.042 156.375C119.475 155.835 119.799 155.294 120.231 154.754C120.34 154.646 120.448 154.429 120.556 154.321C121.528 153.132 122.609 151.943 123.798 150.862C124.015 150.646 124.231 150.43 124.447 150.214C124.663 149.998 124.987 149.781 125.204 149.565C125.42 149.457 125.528 149.241 125.744 149.133C126.176 148.809 126.501 148.484 126.933 148.16C127.041 148.052 127.257 147.944 127.365 147.836C127.365 147.836 127.473 147.836 127.473 147.728C127.473 147.728 127.582 147.728 127.582 147.62C127.69 147.512 127.906 147.404 128.014 147.295C128.338 147.079 128.662 146.863 128.987 146.647C130.716 145.458 132.554 144.485 134.499 143.62C134.715 143.512 134.932 143.404 135.148 143.296C136.337 142.756 137.526 142.323 138.823 141.999C139.255 141.891 139.688 141.783 140.12 141.675C141.633 141.242 143.146 140.918 144.768 140.702C145.092 140.702 145.308 140.594 145.632 140.594C145.849 140.594 146.065 140.594 146.389 140.486C146.605 140.486 146.821 140.486 146.93 140.486C147.038 140.486 147.254 140.486 147.362 140.486C147.47 140.486 147.578 140.486 147.578 140.486C148.335 140.486 149.199 140.378 149.956 140.378C150.064 140.378 150.172 140.378 150.28 140.378C150.28 140.378 150.28 140.378 150.388 140.378H150.497C171.142 140.702 187.787 157.456 187.896 178.101V178.209C187.896 199.178 170.925 216.149 149.956 216.149C149.091 216.149 148.335 216.149 147.578 216.04C147.47 216.04 147.362 216.04 147.362 216.04C147.254 216.04 147.038 216.04 146.93 216.04C146.713 216.04 146.497 216.04 146.389 216.04C146.173 216.04 145.957 216.04 145.632 215.932C145.308 215.932 145.092 215.824 144.768 215.824C143.146 215.608 141.633 215.284 140.12 214.851C139.688 214.743 139.255 214.635 138.823 214.527C137.634 214.095 136.337 213.662 135.148 213.23C134.932 213.122 134.715 213.014 134.499 212.906C132.554 212.041 130.716 211.068 128.987 209.879C128.662 209.663 128.338 209.447 128.014 209.231C127.69 209.015 127.257 208.69 126.933 208.474C126.501 208.15 126.176 207.826 125.744 207.501C125.528 207.393 125.42 207.177 125.204 207.069C124.987 206.853 124.663 206.637 124.447 206.42C124.231 206.204 124.015 205.988 123.798 205.772C122.609 204.691 121.637 203.502 120.556 202.313C120.448 202.205 120.34 201.989 120.231 201.881C119.799 201.34 119.475 200.8 119.042 200.259C118.826 199.935 118.502 199.611 118.286 199.178C117.637 198.206 117.097 197.233 116.556 196.26C116.34 195.936 116.232 195.611 116.016 195.287C113.422 190.207 112.017 184.37 112.017 178.317C112.017 172.264 113.53 166.535 116.016 161.347ZM147.146 210.636V207.069C147.146 206.853 147.146 206.637 147.254 206.529C147.254 206.42 147.254 206.42 147.254 206.312C147.254 206.204 147.362 206.096 147.362 206.096C147.362 205.988 147.47 205.88 147.47 205.88C147.578 205.772 147.686 205.556 147.794 205.448C147.902 205.34 147.902 205.34 148.01 205.231C148.227 205.015 148.443 204.907 148.659 204.799C148.659 204.799 148.767 204.799 148.767 204.691C148.767 204.691 148.875 204.691 148.875 204.583C148.983 204.583 149.091 204.475 149.308 204.475H149.416C149.524 204.475 149.524 204.475 149.632 204.475C149.74 204.475 149.74 204.475 149.848 204.475H149.956C151.469 204.475 152.766 205.772 152.766 207.285V210.852C168.439 209.555 180.978 196.909 182.167 181.236H179.14C177.627 181.236 176.33 179.938 176.33 178.425C176.33 176.912 177.627 175.615 179.14 175.615H182.167C180.762 160.158 168.547 147.836 153.091 146.323V149.241C153.091 150.754 151.794 152.051 150.28 152.051C150.172 152.051 150.064 152.051 149.848 152.051C149.416 151.943 149.091 151.835 148.767 151.619L148.659 151.511L148.551 151.403C148.443 151.403 148.443 151.295 148.335 151.187L148.227 151.079C148.227 151.079 148.227 150.97 148.119 150.97C148.119 150.97 148.119 150.862 148.01 150.862C148.01 150.862 148.01 150.754 147.902 150.754C147.794 150.646 147.794 150.538 147.686 150.43C147.686 150.43 147.686 150.322 147.578 150.322V150.214V150.106C147.578 149.998 147.578 149.89 147.47 149.89V149.781V149.673V149.565V149.457V146.539C131.797 147.728 119.259 159.942 117.745 175.507H121.096C122.609 175.507 123.906 176.804 123.906 178.317C123.906 179.83 122.609 181.127 121.096 181.127H117.637C118.826 196.476 131.365 209.231 147.146 210.636Z" fill="white" />
                    <path d="M137.958 177.669C137.958 177.777 138.066 177.885 138.066 177.993C138.174 178.209 138.174 178.317 138.282 178.533C138.39 178.75 138.499 178.966 138.715 179.074L148.01 188.37C148.119 188.478 148.119 188.478 148.227 188.586C148.335 188.694 148.443 188.802 148.551 188.802C148.551 188.802 148.659 188.802 148.659 188.91C148.767 188.91 148.767 189.018 148.875 189.018H148.983H149.091C149.199 189.018 149.308 189.018 149.308 189.126H149.416C149.524 189.126 149.632 189.126 149.632 189.126H149.74C150.497 189.126 151.145 188.802 151.685 188.261L167.899 172.048C168.98 170.967 168.98 169.238 167.899 168.049C166.818 166.968 165.089 166.968 163.9 168.049L149.632 182.317L142.282 174.966C141.201 173.886 139.471 173.886 138.282 174.966C138.066 175.183 137.958 175.291 137.85 175.507C137.742 175.723 137.634 175.831 137.634 176.047C137.634 176.155 137.526 176.264 137.526 176.372C137.85 177.02 137.85 177.344 137.958 177.669Z" fill="white" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-0 md:space-x-4" style={searchDiv}>
                <div className="search" style={search}>
                <input type="text" placeholder="Search..." style={searchInput} />
               </div>
                  {navigation.map((item) => (
                    <NavItem
                      key={item.name}
                      href={item.href}
                      name={item.name}
                    />
                  ))}
                </div>
              </div>
              {
               tokenData!==null  ?
               (
                  <button 
                  className='text-custom hover:bg-gray-700 hover:text-white rounded-md px-2 md:px-3 py-3 text-sm font-medium'
                  onClick={handleLogout}>Log out
                </button>
               
               ):
               (
                <Link
                  key='Sign in'
                  to='signin'
                  className='text-custom hover:bg-gray-700 hover:text-white rounded-md px-2 md:px-3 py-3 text-sm font-medium'
                >
                 Sign in
              </Link>
                )
              }
             
              <Link
                to="/signup"
                className='text-black hover:bg-gray-700 block rounded-xl ms-1 me-3 md:ms-3 p-1 text-base font-bold border-black border-2 text-center hover:text-white'
              >
                Join Now!
              </Link>
              <div className="flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-black">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-6">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    'text-custom hover:bg-gray-700',
                    'block rounded-md py-2 text-base font-normal text-center hover:text-white'
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <div className='text-center'>
                <Disclosure.Button
                  key={"Join Now!"}
                  as="a"
                  href={'#'}
                  className={classNames(
                    'text-custom hover:bg-gray-700',
                    'inline rounded-md px-2 py-1 text-base font-bold border-black border-2 text-center hover:text-white'
                  )}
                >
                  Join Now!
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
