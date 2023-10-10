import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    cameraPreview: {
        flex: 1,
    },
    exposure: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    controlsContainer: {
        flex: 0.5, // Defina a altura desejada para a seção de controles
        backgroundColor: 'rgba(0, 0, 0, 0.75)', // Cor de fundo com transparência
        justifyContent: 'center',
        alignItems: 'center',
    },
    controlText: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 10,
    },
    controlButton: {
        backgroundColor: '#993399', // Cor de fundo do botão
        padding: 5,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    controlButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    capture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
    },
});
