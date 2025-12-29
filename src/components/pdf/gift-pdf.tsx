import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'

// Register standard font (optional, using internal for simplicity)
// Font.register({ family: 'Outfit', src: '...' })

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Helvetica',
    },
    header: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 40,
    },
    fromTo: {
        fontSize: 12,
        color: '#94a3b8', // slate-400
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 10,
    },
    line: {
        width: 60,
        height: 1,
        backgroundColor: '#e2e8f0', // slate-200
    },
    messageContainer: {
        marginVertical: 40,
        alignItems: 'center',
        width: '80%'
    },
    message: {
        fontSize: 18,
        color: '#1e293b', // slate-900
        textAlign: 'center',
        lineHeight: 1.6,
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        left: 40,
        right: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        paddingTop: 20,
    },
    watermark: {
        fontSize: 10,
        color: '#cbd5e1',
    },
    premiumBrand: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    }
});

export const GiftPdfDocument = ({ gift }: { gift: any }) => (
    <Document>
        <Page size="A5" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.fromTo}>De {gift.from_name} para {gift.to_name}</Text>
                <View style={styles.line} />
            </View>

            <View style={styles.messageContainer}>
                <Text style={styles.message}>{gift.message}</Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.watermark}>
                    {gift.paid ? 'MyGesto Premium' : 'Feito com MyGesto (Grátis)'}
                </Text>
            </View>
        </Page>
    </Document>
);
