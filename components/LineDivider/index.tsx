import { materialColors } from '@utils/colors';
import { sizes } from '@utils/sizes';
import { View, StyleSheet } from 'react-native';

interface Props {
    innerDivider?: boolean
}

export default function LineDivider(props: Props) {
    const { innerDivider } = props;

    return (
        <View style={[styles.divider, innerDivider && styles.innerDivider]} />
    )
}

const styles = StyleSheet.create({
    divider: {
        width: '100%',
        height: 0.5,
        backgroundColor: materialColors.schemes.light.outlineVariant
    },
    innerDivider: {
        paddingHorizontal: sizes.defaultMargin.horizontal
    }
})