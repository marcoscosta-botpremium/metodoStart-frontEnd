import { getTokenList } from '../utils';
import config, { updateConfigCurrencies } from '../pages/common/const'
import { translate } from '../common/i18n'
import { toast } from 'react-hot-toast'
import {
    getMissingBlocksTypes,
    getDisabledMandatoryBlocks,
    getUnattachedMandatoryPairs,
    saveBeforeUnload,
} from '../pages/layout/blockly/utils';

export const checkForRequiredBlocks = () => {
    const displayError = errorMessage => {
        const error = new Error(errorMessage);
        toast.error(error, {
            position: 'bottom left',
            autoHide: false,
            className: 'warn web-status',
        })
    };

    const blockLabels = { ...config.blockLabels };
    const missingBlocksTypes = getMissingBlocksTypes();
    const disabledBlocksTypes = getDisabledMandatoryBlocks().map(block => block.type);
    const unattachedPairs = getUnattachedMandatoryPairs();

    if (missingBlocksTypes.length) {
        missingBlocksTypes.forEach(blockType =>
            displayError(`"${blockLabels[blockType]}" ${translate('block should be added to the workspace')}.`)
        );
        return false;
    }

    if (disabledBlocksTypes.length) {
        disabledBlocksTypes.forEach(blockType =>
            displayError(`"${blockLabels[blockType]}" ${translate('block should be enabled')}.`)
        );
        return false;
    }

    if (unattachedPairs.length) {
        unattachedPairs.forEach(pair =>
            displayError(
                `"${blockLabels[pair.childBlock]}" ${translate('must be added inside:')} "${blockLabels[pair.parentBlock]
                }"`
            )
        );
        return false;
    }

    return true;
}