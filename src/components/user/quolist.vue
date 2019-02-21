<template>
	<div>
		<div class="tablebox" style="background: #FFFFFF;">
		    <p class="title">绑定的银行卡必须为以下银行的储蓄卡，否则会造成无法出借、充值、提现</p>
			<div class="table_list">
				<table cellpadding="0" cellspacing="0" bordercolor="#fff" rules="all" align="center" class="tablemaster">
					<tbody>
					<tr>
						<td class="logo" width="38%"><img src="https://image.79jr.com/Public/v3/M/img/wode/banklogo/BCCB.png" id="bank_logo">&nbsp;北京银行</td>
						<td class="xiane" width="62%">限额：单笔20万&nbsp;单日20万</td>
					</tr>
					<tr>
						<td class="logo" width="38%"><img src="https://image.79jr.com/Public/v3/M/img/wode/banklogo/BOS.png" id="bank_logo">&nbsp;上海银行</td>
						<td class="xiane" width="62%">限额：单笔10万&nbsp;单日10万</td>
					</tr>
					<tr>
						<td class="logo" width="38%"><img src="https://image.79jr.com/Public/v3/M/img/wode/banklogo/CCB.png" id="bank_logo">&nbsp;建设银行</td>
						<td class="xiane" width="62%">限额：单笔10万&nbsp;单日10万</td>
					</tr>
					<tr>
						<td class="logo" width="38%"><img src="https://image.79jr.com/Public/v3/M/img/wode/banklogo/CMB.png" id="bank_logo">&nbsp;招商银行</td>
						<td class="xiane" width="62%">限额：单笔10万&nbsp;单日10万</td>
					</tr>
					<tr>
						<td class="logo" width="38%"><img src="https://image.79jr.com/Public/v3/M/img/wode/banklogo/GDB.png" id="bank_logo">&nbsp;广发银行</td>
						<td class="xiane" width="62%">限额：单笔10万&nbsp;单日20万</td>
					</tr>
					<tr>
						<td class="logo" width="38%"><img src="https://image.79jr.com/Public/v3/M/img/wode/banklogo/CEB.png" id="bank_logo">&nbsp;光大银行</td>
						<td class="xiane" width="62%">限额：单笔5万&nbsp;单日5万</td>
					</tr>
					<tr>
						<td class="logo" width="38%"><img src="https://image.79jr.com/Public/v3/M/img/wode/banklogo/CIB.png" id="bank_logo">&nbsp;兴业银行</td>
						<td class="xiane" width="62%">限额：单笔5万&nbsp;单日5万</td>
					</tr>
					<tr>
						<td class="logo" width="38%"><img src="https://image.79jr.com/Public/v3/M/img/wode/banklogo/ICBC.png" id="bank_logo">&nbsp;工商银行</td>
						<td class="xiane" width="62%">限额：单笔5万&nbsp;单日5万</td>
					</tr>
					<tr>
						<td class="logo" width="38%"><img src="https://image.79jr.com/Public/v3/M/img/wode/banklogo/PAB.png" id="bank_logo">&nbsp;平安银行</td>
						<td class="xiane" width="62%">限额：单笔5万&nbsp;单日5万</td>
					</tr>
					<tr>
						<td class="logo" width="38%"><img src="https://image.79jr.com/Public/v3/M/img/wode/banklogo/SPDB.png" id="bank_logo">&nbsp;浦发银行</td>
						<td class="xiane" width="62%">限额：单笔5万&nbsp;单日5万</td>
					</tr>
					<tr>
						<td class="logo" width="38%"><img src="https://image.79jr.com/Public/v3/M/img/wode/banklogo/BOC.png" id="bank_logo">&nbsp;中国银行</td>
						<td class="xiane" width="62%">限额：单笔2万&nbsp;单日10万</td>
					</tr>
					<tr>
						<td class="logo" width="38%"><img src="https://image.79jr.com/Public/v3/M/img/wode/banklogo/COMM.png" id="bank_logo">&nbsp;交通银行</td>
						<td class="xiane" width="62%">限额：单笔1万&nbsp;单日5万</td>
					</tr>
					<tr>
						<td class="logo" width="38%"><img src="https://image.79jr.com/Public/v3/M/img/wode/banklogo/PSBC.png" id="bank_logo">&nbsp;邮政储蓄银行</td>
						<td class="xiane" width="62%">限额：单笔1万&nbsp;单日1万</td>
					</tr>
					<tr>
						<td class="logo" width="38%"><img src="https://image.79jr.com/Public/v3/M/img/wode/banklogo/CNCB.png" id="bank_logo">&nbsp;中信银行</td>
						<td class="xiane" width="62%">限额：单笔0.50万&nbsp;单日10万</td>
					</tr>
					<tr>
						<td class="logo" width="38%"><img src="https://image.79jr.com/Public/v3/M/img/wode/banklogo/ABC.png" id="bank_logo">&nbsp;农业银行</td>
						<td class="xiane" width="62%">限额：单笔0.20万&nbsp;单日1万</td>
					</tr>				
				</tbody>
				</table>
			</div>
			<p class="title" style=" height:auto; width:auto; background:#fff;line-height:0.6rem;margin-bottom: 2rem;text-align: left; padding: 0 0.2rem;">温馨提示：<br>不在限额表的银行暂不支持快捷充值，您可使用网银充值或转账充值，或重新绑定支持快捷充值的银行卡（一类卡）。</p>
			<a href="javascript:;" onclick="history.go(-1);" class="sure">返回</a>
		</div>
	</div>
</template>

<script>
</script>

<style scoped="scoped">
.table_list{ padding: 0 0.2rem 0 0.2rem;}
.tablemaster{ width: 100%; display: block; font-size: 0.32rem; color: #666666; text-align: center;}
.tablemaster tr{border-bottom: 1px solid #eee;}
.tablemaster tr th{ background: #fffaef; padding: 0.2rem 0; text-align: center;}
.tablemaster tr td{padding: 0.2rem 0 0.2rem 0.2rem;text-align: left;}
.tablemaster tr td.logo{font-size: 0.373rem;color: #414444;}
.tablemaster tr td.xiane{font-size: 0.293rem;color: #b3cbd8;}
.tablebox .title{width: 100%;height: 0.8rem;background: #efeff4;font-size: 0.27rem;color: #ff7319;line-height: 0.8rem;text-align: center;}
.tablemaster tr td img{width: 25%;height: auto;vertical-align:middle;}
.tablebox a.sure{width: 100%;height: 1.2rem;background: #ff7319;text-align: center;line-height: 1.2rem;color: #fff;font-size: 0.48rem;letter-spacing: 0.2rem;position: fixed;bottom: 0;display: block;}
</style>