import React, { Component } from 'react';
import { observer as globalObserver } from '../services/observer'

export default class Summary extends Component {
    constructor({ accountID }) {
        super()
        this.state = { [accountID]: {} }
    }
    componentWillMount() {
        globalObserver.register('bot.info', info => {
            const { accountID } = info;
            this.setState({ [accountID]: { ...this.state[accountID], ...info } });
        });
        globalObserver.register('summary.clear', () => {
            const { accountID } = this.props;
            this.setState({ [accountID]: {} });
        });
    }
    render() {
        const { accountID } = this.props;

        const { totalRuns, totalStake, totalPayout, totalWins, totalLosses, totalProfit, balance } =
            accountID in this.state ? this.state[accountID] : {};

        const profitColor = {
            color: totalProfit > 0 ? 'green' : 'red',
        };
        return (
            <table style={{ width:'100%'}}>
                <thead>
                    <tr>
                        <th>Conta</th>
                        <th>N. de execuções</th>
                        <th>{'Total stake'}</th>
                        <th>{'Total payout'}</th>
                        <th>Lucro</th>
                        <th>{'Loss'}</th>
                        <th>{'Resultado'}</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="accountID">{accountID}</td>
                        <td className="totalRuns">{totalRuns}</td>
                        <td className="totalStake">{totalStake}</td>
                        <td className="totalPayout">{totalPayout}</td>
                        <td style={{color:'green'}} className="totalWins">
                            {totalWins}
                        </td>
                        <td style={{ color:'red'}} className="totalLosses">
                            {totalLosses}
                        </td>
                        <td style={profitColor} className="totalProfit">
                            {totalProfit}
                        </td>
                        <td className="balance">
                            {balance?.includes('UST') ? balance.replace('UST', 'USDT') : balance}
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}