import { ICON_TYPES } from '@elastic/eui'

import { ValuesType } from 'utility-types'

import { appendIconComponentCache } from '@elastic/eui/es/components/icon/icon'

import { icon as EuiMagnifyWithMinus } from '@elastic/eui/es/components/icon/assets/magnifyWithMinus'
import { icon as EuiMinus } from '@elastic/eui/es/components/icon/assets/minus'
import { icon as EuiMagnifyWithPlus } from '@elastic/eui/es/components/icon/assets/magnifyWithPlus'
import { icon as EuiPlus } from '@elastic/eui/es/components/icon/assets/plus'
import { icon as EuiArrowUp } from '@elastic/eui/es/components/icon/assets/arrow_up'
import { icon as EuiArrowDown } from '@elastic/eui/es/components/icon/assets/arrow_down'
import { icon as EuiArrowRight } from '@elastic/eui/es/components/icon/assets/arrow_right'
import { icon as EuiArrowLeft } from '@elastic/eui/es/components/icon/assets/arrow_left'
import { icon as EuiDocument } from '@elastic/eui/es/components/icon/assets/document'
import { icon as EuiLogoElastic } from '@elastic/eui/es/components/icon/assets/logo_elastic'
import { icon as EuiIconHeart } from '@elastic/eui/es/components/icon/assets/heart'
import { icon as EuiIconMoon } from '@elastic/eui/es/components/icon/assets/moon'
import { icon as EiuIconEmail } from '@elastic/eui/es/components/icon/assets/email'
import { icon as EiuIconCheer } from '@elastic/eui/es/components/icon/assets/cheer'
import { icon as EuiIconFaceHappy } from '@elastic/eui/es/components/icon/assets/face_happy'
import { icon as EuiIconCross } from '@elastic/eui/es/components/icon/assets/cross'
import { icon as EuiIconTableOfContents } from '@elastic/eui/es/components/icon/assets/tableOfContents'
import { icon as EuiIconApmTrace } from '@elastic/eui/es/components/icon/assets/apm_trace'
import { icon as EuiIconBoxesHorizontal } from '@elastic/eui/es/components/icon/assets/boxes_horizontal'
import { icon as EuiIconExpandMini } from '@elastic/eui/es/components/icon/assets/expandMini'
import { icon as EuiIconTableDencityNormal } from '@elastic/eui/es/components/icon/assets/table_density_normal'
import { icon as EuiIconFullScreen } from '@elastic/eui/es/components/icon/assets/full_screen'
import { icon as EuiIconListAdd } from '@elastic/eui/es/components/icon/assets/list_add'
import { icon as EuiIconSortable } from '@elastic/eui/es/components/icon/assets/sortable'
import { icon as EuiIconFullScreenExit } from '@elastic/eui/es/components/icon/assets/fullScreenExit'

type IconComponentNameType = ValuesType<typeof ICON_TYPES>
type IconComponentCacheType = Partial<Record<IconComponentNameType, unknown>>

const cachedIcons: IconComponentCacheType = {
    magnifyWithMinus: EuiMagnifyWithMinus,
    magnifyWithPlus: EuiMagnifyWithPlus,
    minus: EuiMinus,
    plus: EuiPlus,
    arrowUp: EuiArrowUp,
    arrowDown: EuiArrowDown,
    arrowRight: EuiArrowRight,
    arrowLeft: EuiArrowLeft,
    document: EuiDocument,
    logoElastic: EuiLogoElastic,
    heart: EuiIconHeart,
    moon: EuiIconMoon,
    email: EiuIconEmail,
    cheer: EiuIconCheer,
    faceHappy: EuiIconFaceHappy,
    cross: EuiIconCross,
    tableOfContents: EuiIconTableOfContents,
    apmTrace: EuiIconApmTrace,
    boxesHorizontal: EuiIconBoxesHorizontal,
    expandMini: EuiIconExpandMini,
    tableDensityNormal: EuiIconTableDencityNormal,
    fullScreen: EuiIconFullScreen,
    listAdd: EuiIconListAdd,
    sortable: EuiIconSortable,
    fullScreenExit: EuiIconFullScreenExit,
}

appendIconComponentCache(cachedIcons)
