const {
  ipcRenderer
} = window;

// ! `! 으로 된 내용 : 필수 ? 로 된 내용 : 비필수, <상품설명 : 입력값 예시> 형식`
// ! common : 공통사항 / uncommon : 상품별 정의사항

const Product_Structure = {
  common: {
    product_status: '', // ! 상품상태 : 신상품 / 중고상품
    product_categoryId: '', // ! 카테고리 코드 : 50000807
    product_asInfo: '', // ! A/S 안내내용 : 토요일 10:00~14:00 까지 응대 가능하며 일요일은 휴무입니다 (HTML은 입력할 수 없음)
    product_asContact: '', // ! A/S 전화번호 : 010-0000-0000 ( 숫자와 "-" 만 입력 가능 / 20자 이내)
    product_manufacture: '', // ? 제조사 : 동광인터내셔날 ( 제조사명 )
    product_brandName: '', // ? 브랜드명 : SOUP
    product_dateOfManufacture: '', // ? 제조일자 : 2016-8-1 ( yyyy-MM-dd 형식으로 입력)
    product_dateOfExpire: '', // ? 유효일자 : 2017-8-1 ( yyyy-MM-dd 형식으로 입력)
    poduct_vatType: '', // ! 부가세 : 과세상품,면세상품,영세상품 ( 보기 중 선택 )
    product_underAge: '', // ! 미성년자 구매 : Y, N (y: 미성년자 구매 가능 , n : 미성년자 구매 불가능)
    product_showReview: '', // ! 구매평 노출 여부 : Y , N ( y : 노출 , n : 노출 안함)
    product_originCode: '', // ! 원산지 코드 : 원산지 찾기 팝업에서 검색한 원산지 코드를 입력
    product_importer: '', // ! ? (조건부 필수) 수입사 : 동광 ( 원산지를 수입산으로 선택한 경우 필수 입력)
    product_multiOrigin: '', // ! 복수 원산지 여부 : Y : 원산지가 다른 상품을 등록시, 원산지 같은 상품 ( Y 인 경우 상세정보에 상품별 원산지 입력해야함)
    product_originSelfInput: '', // ! ? (조건부 필수 ) 원산지 직접 입력 : 원산지입력 ( 원산지 직접 입ㄹ력인 경우 필수 입력 )
    product_deliveryType: '', // ! ? (조건부 필수 : 배송 상품인 경우 필수 입력) 배송방법 : 배송상품인 경우 택배/소포/등기/직접배송(화물배달) 항목 중 선택 ( 입력 하지 않으면 배송없음 상품으로 등록됨)
    product_deliveryFeeType: '', // ! ? (조건부 필수 : 배송 상품인 경우 입력) 배송비 유형 : 무료,조건부무료,유료,수량별부과 항목 중 선택 입력
    product_deliveryFeeDefault: '', // ! ? (조건부 필수 :  배송비 유형이 조건부무료 / 유료 / 수량별 부과인 경우) 기본배송비 : 2500 ( 10원 단위로 입력 )
    product_deliveryPaymentType: '', // ! ? (조건부 필수 : 기본 배송비가 있는 경우) 배송비 결제 방식 : 착불,선결제,착불 또는 선결제 중 선택
    product_deliveryConditionFree: '', // ! ? (조건부 필수 : 배송비 유형이 조건부 무료인 경우) 조건부무료 상품판매가합계 : 30000 ( 무료 배송가능한 상품 판매가 합계 입력)
    product_deliveryIndividualQuantity: '', // ! ? (조건부 필수 : 배송비 유형이 수량별 부과 인 경우) 수량별부과 수량 : 반복부과될 상품 개수를 입력 ( 2개마다 배송비 부과일경우 2 )
    product_deliveryReturnFee: '', // ! ? (조건부 필수 : 배송 상품인 경우)  반품배송비 : 10원 단위 입력
    product_deliveryExchangeFee: '', // ! ? (조건부 필수 : 배송 상품인 경우) 교환배송비 : 10원 단위 입력
    product_deliveryRegionalInfo: '', // ? 지역별 차등 배송비 정보 : 영종동의 경우 톨게이트 비용 1만원 추가됩니다 ( 제주/도서산간을 제외한 지역별 차등배송비가 있을 경우, 50자까지)
    product_deliveryInstallFee: '', // ? 별도 설치비 : Y, N 미입력시 N 으로 등록됨 (Y : 별도설치비 있음 / N : 별도설리비 없음음
    product_ownerAdditionalInfo: '', // ? 판매자 특이사항 : 청약철회/배송기간 및 방법 / 교환 반품 보증 및 추가비용 / 판매일시/판매지역/판매수량/인도지역 등과 관련되어 특이사항시 입력
    product_discountImmediateValue: '', // ? 즉시 할인 값 : 구매시 즉시 할인되어 구매할 수 있는 할인금액 설정 (정액 : 최소 10원 ~ 최대 판매가 미만 / 정율 : 1%~99% !5 단위로)
    product_discountImmediateUnit: '', // ! ? (조건부 필수 : 즉시 할인 설정시) 즉시 할인 단위 : 원 / % 중 입력 (즉시 할인)
    product_discountMultiOrderConditionValue: '', // ? 복수구매 할인 조건 값 : 3 ( 복수구매 할인을 적용할 주문금액이나 주문 수량)
    product_discountMultiOrderConditionUnit: '', // ! ? (조건부 필수 : 복수구매 할인 조건 적용시) 복수구매 할인 조건 단위 : 원,개 중 설정
    product_discountMultiOrderValue: '', // ! ? (조필 : 복수구매 할인 조건 적용시) 복수구매 할인 값 (정액 : 10~초대 판매가 미만 / 정율 : 1~99%)
    product_discountMultiOrderUnit: '', // ! ? (조필 : 복수구매 할인 조건 적용시) 복수구매 할인 단위 : 원,%
    product_rewardOrderPointValue: '', // ? 상품 구매시 포인트 지급 값 : 정액 / 정률
    product_rewardOrderPointUnit: '', // ! ? 상품 구매시 포인트 지급 단위 : %,원
    product_rewardTextReviewValue: '', // ? 텍스트리뷰 작성시 지급 포인트 : 정액 / 정률
    product_rewardTextReviewUnit: '', // ! ? 텍스트리뷰 작성시 지급 포인트 단위 : %,원
    product_rewardMediaReviewValue: '', // ? 포토/동영상 리뷰 작성시 지급 포인트 : 정액 / 정률
    product_rewardMediaReviewUnit: '', // ! ? 포토/동영상 리뷰 작성시 지급 포인트 단위 :  %,원
    product_rewardMonthTextReviewValue: '', // ? 한달사용 텍스트 리뷰 작성시 지급 포인트 ( 정액 )
    product_rewardMonthMediaReviewValue: '', // ? 한달사용 포토/동영상 리뷰 작성시 지급 포인트 ( 정액 )
    product_rewardFriendReviewValue: '', // ? 톡톡친구/스토어짐 고객 리뷰 작성시 지급 포인트 ( 정액 )
    product_interestFreeMont: '', // ? 무이자 할부 제공시 : 3,6,9,12 로 입력
    product_present: '' // ? 사은품 : 제공할 사은품이 있으면 입력
  },
  uncommon: {
    product_name: '', // ! 상품명 : 호리호리 베이지(100자까지 입력 가능)
    product_price: 0, // ! 판매가격 : 10000 (10원 단위로 입력)
    product_quantity: 0, // ! 재고수량 : 10 (1개 이상 입력 / 옵션 재고 사용시 옵션 재고수량으로 대치)
    product_mainImageName: '', // ! 대표 이미지 파일명 : 1.jpg (권장크기 : 640x640 jpg,jpeg,gif,png,bmp 형식의 정지 이미지만 80자 이내)
    product_additionalImageNames: '', // ! 추가 이미지 파일명들: 추가1.jpg,추가2.jpg (권장크기 동일, 추가이미지는 9개까지 등록 가능 ',' 를 이용해 구분)
    product_detailInfo: '', // ! 상품 상세정보 : <img src="~~~"/> ( 외부 호스팅에 올린 이미지 url 사용하여 표시 하는것 가능, 링크는 사용 제한됨 )
    product_ownerCode: '', // ? 판매자 상품코드 : 111111 ( 30자 이내로 입력 )
    product_ownerBarcode: '', // ? 판매자 바코드 : 222222 ( 30 자 이내로 입력 )
    product_optionType: '', // ? 옵션 형태 : 단독형/조합형/입력형 중 선택
    product_optionName: '', // ! ? (조필 : 옵션형태 선택시 ) 옵션 이름 : 옵션명1\n옵션명2\n옵션명3 [컬러\n사이즈] ( 줄바꿈으로 구분, 최대 20자까지, 3개까지)
    product_optionValue: '', // ! ? (조필 : 단독형/조합형 ) 옵션 값 : 옵션명별로 입력, ',' 로 구분 / 엔터로 또 구분 [빨강,노랑,파랑\nS,M,L]
    product_optionPrice: '', // ! ? (조필 : 조합형) 옵션 가격 : 0,100,100\n0,0,0\n1000,100,200 (옵션가가 0인 옵션이 있어야함, 판매가 기준으로 나뉨)
    product_optionquantity: '', // ! ? (조필 : 조합형) 옵션 재고수량 : 첫번째 옵션에 대해서 입력해주어야함 1,10,20
    product_additioanlProductName: '', // ? 추가 상품명 : 추가상품을 사용할 경우 추가상품명 입력 ( 최대 10개 )
    product_additionalProductValue: '', // ? 추가 상품값 : 추가 상품명을 입력한 경우 추가상품값 입력
    product_additionalProductPrice: '', // ? 추가 상품 가격 : 추가 상품명을 입력한 경우 추가상품가 입력
    product_additionalProductQuantity: '', // ? 추가 상품 재고 수량 : 추가 상품명 입력한 경우 재고수량 입력
    product_informationNoticeName: '', // ? 상품정보 제공고시 품명
    product_informationNoticeModel: '', // ? 상품정보 제공고시 모델명
    product_informationNoticeCert: '', // ? 상품정보 제공고시 인증허가사항 ( 200자까지 입력)
    product_informationNoticeManufacture: '', // ? 상품정보 제공고시 제조자 ( 200자까지 입력)
    product_jjimOnly: '', // ? 스토어찜 회원 전용 여부 : Y : 스마트스토어 스토어찜 회원만 구매 가능 N : 전체 구매 가능
    product_culturePriceOption: '', // ? 문화비 소득 공제 : 중고도서,유아동전집,여행/문화/공연/티켓 카테고리 선택시 입력 Y : 소득공제 가능 N : 불가
    product_ISBN: '', // ! ? (조필 : 중고/유아동전집 카토기리 선택시 ) ISBN : ISBN 13자리
    product_selfPublished: '' // ! ? 중고도서,유아동전집 카테고리 선택시 입력 독립출판인 경우 ISBN 입력 안해도됨 Y : 독립출판, N : 일반출판물
  }
}
const ProductUtil = {
  
}
export default ProductUtil;