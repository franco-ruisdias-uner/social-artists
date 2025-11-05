import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {storage} from '@core/firebase';
import * as Crypto from 'expo-crypto';


export interface UploadCallbacks {
  onProgress?: (progress: number) => void;
  onSuccess?: (downloadURL: string) => void;
  onError?: (error: Error) => void;
}

export const uploadImage = async (
    uri: string,
    folder: string = 'images',
    callbacks?: UploadCallbacks
): Promise<string | null> => {
  try {
    // Convertir la imagen a blob
    const response = await fetch(uri);
    const blob = await response.blob();

    // Crear una referencia en el storage de firebase
    const fileExtension = uri.split('.').pop() || 'jpg';
    const filename = `${folder}/${Crypto.randomUUID()}.${fileExtension}`;
    const storageRef = ref(storage, filename);

    //Subir con progressTracking
    const uploadTask = uploadBytesResumable(storageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            callbacks?.onProgress?.(progress);
          },
          (error) => {
            callbacks?.onError?.(error);
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              callbacks?.onSuccess?.(downloadURL);
              resolve(downloadURL);
            } catch (error) {
              callbacks?.onError?.(error as Error);
              reject(error);
            }
          }
      );
    });
  } catch (error) {
    callbacks?.onError?.(error as Error);
    return null;
  }
};
