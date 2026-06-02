<!-- 卡片信息展示 -->
<template>
    <div class="flex box-f" :class="[[2, 4].includes(changeIndex) ? 'flex-v ' : '']">
        <div v-for="(item, index) in listInfo[changeIndex].arr" :key="index" :style="{ marginBottom: changeIndex === 1 ? '40px' : '0' }">
            <div class="left-title">{{ item.title }}</div>
            <!--  -->
            <div class="con-info mr-20" :class="[[2, 4].includes(changeIndex) ? 'con-info-two ' : '']">
                <div v-for="(infoItem, infoIndex) in item.arrInfo" :key="infoIndex" class="con-info-item">
                    <div class="con-info-title flex align-center">
                        <img class="img-icon" :src="infoItem.icon" mode="" />{{ infoItem.title }}
                    </div>
                    <div v-if="infoItem.desc" class="con-info-desc">
                        {{ infoItem.desc }}
                    </div>
                    <div v-else class="con-info-ul">
                        <ul>
                            <li v-for="(ulImte, ulIndex) in infoItem.textList" :key="ulIndex" class="flex flex-v-c">
                                <div class="yuan"></div>
                                {{ ulImte }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        changeIndex: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            listInfo: [
                {
                    tpye: 1, // 中国银行
                    arr: [
                        {
                            title: '中银企E贷\n银税贷',
                            arrInfo: [
                                {
                                    title: '服务对象',
                                    icon: require('@/assets/bank/fwdx.png'),
                                    desc: '注册在上海市、依法合规纳税的小微企业'
                                },
                                {
                                    title: '授信额度',
                                    icon: require('@/assets/bank/sxed.png'),
                                    desc: '最高信用额度可达300万元'
                                },
                                {
                                    title: '申请条件',
                                    icon: require('@/assets/bank/sqtj.png'),
                                    desc: '',
                                    textList: [
                                        '符合国际认定的小微企业',
                                        '在中行开立对公结算账户',
                                        '企业及其法定代表人信用良好',
                                        '符合中行其他要求'
                                    ]
                                },
                                {
                                    title: '业务特点',
                                    icon: require('@/assets/bank/ywtd.png'),
                                    desc: '',
                                    textList: ['在线服务，秒批秒贷', '银税互动，纳税增信', '灵活授信，随借随还']
                                }
                            ]
                        },
                        {
                            title: '中银企E贷\n抵押贷',
                            arrInfo: [
                                {
                                    title: '服务对象',
                                    icon: require('@/assets/bank/fwdx.png'),
                                    desc: '注册在上海市、依法合规纳税的小微企业'
                                },
                                {
                                    title: '授信额度',
                                    icon: require('@/assets/bank/sxed.png'),
                                    desc: '最高授信额度可达1000万元'
                                },
                                {
                                    title: '授信期限',
                                    icon: require('@/assets/bank/sxqx.png'),
                                    desc: '最长贷款期限可达3年'
                                },
                                {
                                    title: '申请条件',
                                    icon: require('@/assets/bank/sqtj.png'),
                                    desc: '',
                                    textList: [
                                        '抵押房产产权清晰、价值稳定',
                                        '在中行开立对公结算账户',
                                        '企业及其法定代表人信用良好',
                                        '符合中行其他要求'
                                    ]
                                },
                                {
                                    title: '业务特点',
                                    icon: require('@/assets/bank/ywtd.png'),
                                    desc: '',
                                    textList: ['在线估值、自动审批', '利率优惠、快速放款']
                                }
                            ]
                        },
                        {
                            title: '中银企E贷\n惠担保',
                            arrInfo: [
                                {
                                    title: '服务对象',
                                    icon: require('@/assets/bank/fwdx.png'),
                                    desc: '注册在上海市国标小微企业'
                                },
                                {
                                    title: '授信额度',
                                    icon: require('@/assets/bank/sxed.png'),
                                    desc: '最高授信额度可达1000万元'
                                },
                                {
                                    title: '授信期限',
                                    icon: require('@/assets/bank/sxqx.png'),
                                    desc: '最长贷款期限可达1年'
                                },
                                {
                                    title: '申请条件',
                                    icon: require('@/assets/bank/sqtj.png'),
                                    desc: '',
                                    textList: [
                                        '在中行开立对公结算账户',
                                        '企业及企业实际控制人',
                                        '依法进行税务登记，依法纳税',
                                        '符合中行及相关担保机构的其他要求'
                                    ]
                                },
                                {
                                    title: '业务特点',
                                    icon: require('@/assets/bank/ywtd.png'),
                                    desc: '',
                                    textList: ['在线服务、利率优惠', '快速放款、随借随还']
                                }
                            ]
                        }
                    ]
                },
                {
                    tpye: 2, // 泰隆银行
                    arr: [
                        {
                            title: '无抵押\n信用贷款',
                            arrInfo: [
                                {
                                    title: '产品介绍',
                                    icon: require('@/assets/bank/cpsx.png'),
                                    desc: '',
                                    textList: [
                                        '10-500万元，具体金额视客户具体情况而定,灵活定价,三天内放款。',
                                        '提供资料:身份证、营业执照、财报、流水等主要资料。'
                                    ]
                                }
                            ]
                        },
                        {
                            title: '抵押贷款',
                            arrInfo: [
                                {
                                    title: '产品介绍',
                                    icon: require('@/assets/bank/cpsx.png'),
                                    desc: '金额依据抵押物价值定，抵押率七折，灵活定价,利率在4—8'
                                }
                            ]
                        },
                        {
                            title: '贸易融资\n贷款',
                            arrInfo: [
                                {
                                    title: '产品介绍',
                                    icon: require('@/assets/bank/cpsx.png'),
                                    desc: '支持美元、欧元、日元，无抵押信用类，利率4—5'
                                }
                            ]
                        },
                        {
                            title: '随贷通卡',
                            arrInfo: [
                                {
                                    title: '产品介绍',
                                    icon: require('@/assets/bank/cpsx.png'),
                                    desc: '10-50万元，一次授信，三年不愁，可直接通过该卡取款、转账、消费，随借随还，按日计息，利率为万分之五/天。'
                                }
                            ]
                        },
                        {
                            title: '银行承兑\n汇票开立',
                            arrInfo: [
                                {
                                    title: '产品介绍',
                                    icon: require('@/assets/bank/cpsx.png'),
                                    desc: '保证金比例低，无手续费，当天申请，当天出票，保证 金享有我行相应定期利息(3个月1.54%， 6个月1.82%，12个月2.1%)。'
                                }
                            ]
                        },
                        {
                            title: '泰e贷',
                            arrInfo: [
                                {
                                    title: '产品介绍',
                                    icon: require('@/assets/bank/cpsx.png'),
                                    desc: '纯信用线上贷款，期限长，随借随还，循环使用，从办理到提款只需5分钟，利率依据个人过模型评定一般4-6。（工薪客户也可办理）'
                                }
                            ]
                        }
                    ]
                },
                {
                    tpye: 3, // 招商银行
                    arr: [
                        {
                            title: '小微闪电贷',
                            arrInfo: [
                                {
                                    title: '服务对象',
                                    icon: require('@/assets/bank/fwdx.png'),
                                    desc: '面向稳定经营一年以上的小微企业主或个体商户'
                                },
                                {
                                    title: '授信额度',
                                    icon: require('@/assets/bank/sxed.png'),
                                    desc: '额度最高可至100万元'
                                },
                                {
                                    title: '申请方式',
                                    icon: require('@/assets/bank/sqtj.png'),
                                    desc: '',
                                    textList: ['线上申请', '快速放款', '还款方式自由选择', '随借随还']
                                },
                                {
                                    title: '利率',
                                    icon: require('@/assets/bank/lilv.png'),
                                    desc: '年化利率低至5.04%（单利）起，且无需收取任何手续费'
                                },
                                {
                                    title: '服务',
                                    icon: require('@/assets/bank/fw.png'),
                                    desc: '专属服务，一对一专属融资顾问，陪伴企业经营成长'
                                }
                            ]
                        }
                    ]
                },
                {
                    tpye: 4, // 平安银行
                    arr: [
                        {
                            title: '新微贷\n数据贷/小微快贷',
                            arrInfo: [
                                {
                                    title: '贷款金额 ',
                                    icon: require('@/assets/bank/sxed.png'),
                                    desc: '人民币1000元~200万（含）元'
                                },
                                {
                                    title: '目标客群',
                                    icon: require('@/assets/bank/fwdx.png'),
                                    desc: '',
                                    textList: ['25~65（含）周岁', '前两大自然人股东且持股20%以上 ', '工商注册15个月以上', '非禁入行业']
                                },
                                {
                                    title: '贷款期限',
                                    icon: require('@/assets/bank/sxqx.png'),
                                    desc: '循环额度可选3、6、9、12期；单笔额度可选24、36期，30万元以内直连方案1年期贷款可按5年气球贷还款'
                                },
                                {
                                    title: '产品属性',
                                    icon: require('@/assets/bank/cpsx.png'),
                                    desc: '',
                                    textList: ['无抵押信用贷款', '小微企业/企业主均可申请', '纳税开票记录良好、优质企业可享提额方案']
                                },
                                {
                                    title: '定价',
                                    icon: require('@/assets/bank/lilv.png'),
                                    desc: '年化4.68%~18.36%，10档风险定价',
                                    textList: []
                                },
                                {
                                    title: '还款方式',
                                    icon: require('@/assets/bank/hkfs.png'),
                                    desc: '',
                                    textList: [
                                        '循环额度：等额本息、等额本息、先息后本',
                                        '单笔期供：等额本息、等额本金、气球贷',
                                        '可提前还款，无违约金'
                                    ]
                                },
                                {
                                    title: '支付方式',
                                    icon: require('@/assets/bank/zffs.png'),
                                    desc: '自主支付、受托支付，经营性用途'
                                },
                                {
                                    title: '审批方式',
                                    icon: require('@/assets/bank/shenpi.png'),
                                    desc: '全流程线上申请、审批、提款，可线下补件'
                                }
                            ]
                        },
                        {
                            title: '微e贷',
                            arrInfo: [
                                {
                                    title: '贷款金额 ',
                                    icon: require('@/assets/bank/sxed.png'),
                                    desc: '一般贷款额度≤300万（含）元，备付金额度≤60万（含）元'
                                },
                                {
                                    title: '目标客群',
                                    icon: require('@/assets/bank/fwdx.png'),
                                    desc: '',
                                    textList: [
                                        '18~65（含）周岁，经营满2年、本地居住满1年、本地有住宅的',
                                        '自雇人士，可与宅抵贷（经营）、抵押E贷叠加'
                                    ]
                                },
                                {
                                    title: '贷款期限',
                                    icon: require('@/assets/bank/sxqx.png'),
                                    desc: '最长5年'
                                },
                                {
                                    title: '产品属性',
                                    icon: require('@/assets/bank/cpsx.png'),
                                    desc: '线上申请、线下办理，目标客群为本地有房产、有存货、年销售，额多为 500万以上、销售回款时间短的供应链1+N小微客群'
                                },
                                {
                                    title: '定价',
                                    icon: require('@/assets/bank/lilv.png'),
                                    desc: '',
                                    textList: ['一般贷款额度定价：年化利率4.5%~11.88%', '备付金额度定价：年化利率12.06%~18%']
                                },
                                {
                                    title: '还款方式',
                                    icon: require('@/assets/bank/hkfs.png'),
                                    desc: '按月/按季先息后本、等额本息、等额本金，每笔提款期限最长不超过5年（单笔提款期限超过1年需期供）'
                                },
                                {
                                    title: '支付方式',
                                    icon: require('@/assets/bank/zffs.png'),
                                    desc: '≤50万（含）自主支付、＞50万受托支付的经营性用途'
                                },
                                {
                                    title: '审批方式',
                                    icon: require('@/assets/bank/shenpi.png'),
                                    desc: '线上申请、审批、提款，可线下补件'
                                }
                            ]
                        },
                        {
                            title: '宅抵贷',
                            arrInfo: [
                                {
                                    title: '贷款金额 ',
                                    icon: require('@/assets/bank/sxed.png'),
                                    desc: '最高不超过2000万（含）元人民币，抵押率最高85%'
                                },
                                {
                                    title: '目标客群',
                                    icon: require('@/assets/bank/fwdx.png'),
                                    desc: '18~70（含）周岁，好人好房、流水健康的受薪/自雇人士'
                                },
                                {
                                    title: '贷款期限',
                                    icon: require('@/assets/bank/sxqx.png'),
                                    desc: '最长授信10年有效，可选3、6、9、12期'
                                },
                                {
                                    title: '产品属性',
                                    icon: require('@/assets/bank/cpsx.png'),
                                    desc: '',
                                    textList: [
                                        '房龄30年以内、面积≥25平方米的住宅（含别墅）、商用/商住',
                                        '房抵押贷款，可用于消费、经营，可一押可二押'
                                    ]
                                },
                                {
                                    title: '定价',
                                    icon: require('@/assets/bank/lilv.png'),
                                    desc: '最低3.7%（各城市不同）'
                                },
                                {
                                    title: '还款方式',
                                    icon: require('@/assets/bank/hkfs.png'),
                                    desc: '等额本息，可随借随还，提前还款无违约金'
                                },
                                {
                                    title: '支付方式',
                                    icon: require('@/assets/bank/zffs.png'),
                                    desc: '自主支付、受托支付，消费、经营性用途均可'
                                },
                                {
                                    title: '审批方式',
                                    icon: require('@/assets/bank/shenpi.png'),
                                    desc: '线上申请、审批、提款，线下补件、办押'
                                }
                            ]
                        },
                        {
                            title: '抵押E贷',
                            arrInfo: [
                                {
                                    title: '贷款金额 ',
                                    icon: require('@/assets/bank/sxed.png'),
                                    desc: '最高不超过4000万（含）元人民币，抵押率最高85%，纳税开票，记录良好、或专精特新/小巨人企业可享专属方案'
                                },
                                {
                                    title: '目标客群',
                                    icon: require('@/assets/bank/fwdx.png'),
                                    desc: '18~70（含）周岁，好人好房、流水健康的自雇人士，可叠加新微贷产品额度'
                                },
                                {
                                    title: '贷款期限',
                                    icon: require('@/assets/bank/sxqx.png'),
                                    desc: '最长授信10年有效，可选3、6、9、12期'
                                },
                                {
                                    title: '产品属性',
                                    icon: require('@/assets/bank/cpsx.png'),
                                    desc: '',
                                    textList: [
                                        '房龄30年以内、面积≥25平方米的住宅（含别墅）、商用/商住',
                                        '房抵押贷款，可用于消费、经营，可一押可二押'
                                    ]
                                },
                                {
                                    title: '定价',
                                    icon: require('@/assets/bank/lilv.png'),
                                    desc: '最低3.7%（各城市不同）'
                                },
                                {
                                    title: '还款方式',
                                    icon: require('@/assets/bank/hkfs.png'),
                                    desc: '等额本息、等额本金、净息还款、气球贷'
                                },
                                {
                                    title: '支付方式',
                                    icon: require('@/assets/bank/zffs.png'),
                                    desc: '自主支付、受托支付，经营性用途'
                                },
                                {
                                    title: '审批方式',
                                    icon: require('@/assets/bank/shenpi.png'),
                                    desc: '线上申请、审批、提款，线下补件、办押'
                                }
                            ]
                        }
                    ]
                },
                {
                    tpye: 5,
                    arr: [
                        {
                            title: '邮易贷',
                            arrInfo: [
                                {
                                    title: '服务对象',
                                    icon: 'https://public-bee-mall.oss-cn-shanghai.aliyuncs.com/static/h5/bank/fwdx.png',
                                    desc: '注册在上海市、依法合规纳税的小微企业'
                                },
                                {
                                    title: '授信额度',
                                    icon: 'https://public-bee-mall.oss-cn-shanghai.aliyuncs.com/static/h5/bank/sxed.png',
                                    desc: '额度高、最高授信1000万元 、利率低  年化率4.2%'
                                },
                                {
                                    title: '业务特点',
                                    icon: 'https://public-bee-mall.oss-cn-shanghai.aliyuncs.com/static/h5/bank/ywtd.png',
                                    desc: '',
                                    textList: [
                                        '一键申请，额度秒出',
                                        '线上申请，随时办理',
                                        '随借随还，按日计息',
                                        '模式多，信用/保证/抵押/组合'
                                    ]
                                }
                            ]
                        },
                        {
                            title: '小微极速贷',
                            arrInfo: [
                                {
                                    title: '服务对象',
                                    icon: 'https://public-bee-mall.oss-cn-shanghai.aliyuncs.com/static/h5/bank/fwdx.png',
                                    desc: '注册在上海市、依法合规纳税的小微企业'
                                },
                                {
                                    title: '授信额度',
                                    icon: 'https://public-bee-mall.oss-cn-shanghai.aliyuncs.com/static/h5/bank/sxed.png',
                                    desc: '最高2000万，线上模式最高1000万，年期贷款年化利率可低至3.7%(单利)'
                                },
                                {
                                    title: '业务特点',
                                    icon: 'https://public-bee-mall.oss-cn-shanghai.aliyuncs.com/static/h5/bank/ywtd.png',
                                    desc: '',
                                    textList: ['随借随还，支持最长5年先息后本', '提款期5年，单笔期限最长5年', '手机操作，即时支付']
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
};
</script>

<style scoped lang="scss">
.box-f {
    min-height: 360px;
    background: #ffffff;
    box-shadow: 0px 4px 14px 0px rgba(172, 146, 146, 0.2);
    border-radius: 10px 10px 10px 10px;
    padding: 56px 47px;
    box-sizing: border-box;
    justify-content: space-between;
    overflow-x: auto;
}
.left-title {
    display: inline-flex;
    height: 48px;
    align-items: center;
    font-size: 28px;
    color: #666666;
    font-weight: bold;
    white-space: pre-line;
    position: relative;
    padding-left: 15px;
    line-height: 30px;
    font-style: italic;
    margin-bottom: 24px;

    &::before {
        content: '';
        width: 6px;
        height: 48px;
        background: #fd5901;
        border-radius: 2px;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }
}

.con-info {
    // overflow-x: auto;
    &:last-child {
        margin-right: 0;
    }
    .con-info-item {
        width: 200px;
        padding: 20px 0;
        border-bottom: 1px dashed #ededed;
        &:last-child {
            border-bottom: none;
            padding-bottom: 0;
        }
        .con-info-title {
            .img-icon {
                width: 20px;
                height: 20 px;
                display: block;
                margin-right: 8px;
            }
            font-size: 14px;
            font-weight: bold;
            color: #666666;
        }

        .con-info-desc,
        .con-info-ul {
            font-size: 12px;
            color: #999999;
            padding-left: 28px;
            box-sizing: border-box;
            margin-top: 5px;
            ul {
                padding: 0;
            }
        }

        .yuan {
            min-width: 5px;
            min-height: 5px;
            max-height: 5px;
            border-radius: 50%;
            background-color: #666666;
            margin-right: 5px;
        }
    }
}
.con-info-two {
    display: flex;
    .con-info-item {
        border-bottom: none;
    }
}
</style>
