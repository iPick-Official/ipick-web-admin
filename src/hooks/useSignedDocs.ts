import { useSignedS3Url } from "./useSignedS3Url";

export function useSignedDocs(
  docKeys: Record<string, string | null | undefined>
) {
  // Personal Docs
  const profile = useSignedS3Url(docKeys.profile)?.signedUrl;
  const pwdFile = useSignedS3Url(docKeys.pwdFile)?.signedUrl;
  const vaccinationCert = useSignedS3Url(docKeys.vaccinationCert)?.signedUrl;
  const driverLicenseFront = useSignedS3Url(
    docKeys.driverLicenseFront
  )?.signedUrl;
  const driverLicenseBack = useSignedS3Url(
    docKeys.driverLicenseBack
  )?.signedUrl;
  const otherDoc = useSignedS3Url(docKeys.otherDoc)?.signedUrl;

  // Transport Docs
  const operatorDocs = useSignedS3Url(docKeys.operatorDocs)?.signedUrl;
  const ownerDocs = useSignedS3Url(docKeys.ownerDocs)?.signedUrl;
  const operatorsDoc = useSignedS3Url(docKeys.operatorsDoc)?.signedUrl;
  const vehicleOR = useSignedS3Url(docKeys.vehicleOR)?.signedUrl;
  const vehicleCR = useSignedS3Url(docKeys.vehicleCR)?.signedUrl;
  const vehicleSalesInvoice = useSignedS3Url(
    docKeys.vehicleSalesInvoice
  )?.signedUrl;
  const authorizationLetterPageOne = useSignedS3Url(
    docKeys.authorizationLetterPageOne
  )?.signedUrl;
  const authorizationLetterPageTwo = useSignedS3Url(
    docKeys.authorizationLetterPageTwo
  )?.signedUrl;
  const sPAPageOne = useSignedS3Url(docKeys.sPAPageOne)?.signedUrl;
  const sPAPageTwo = useSignedS3Url(docKeys.sPAPageTwo)?.signedUrl;
  const pAPageOne = useSignedS3Url(docKeys.pAPageOne)?.signedUrl;
  const pAPageTwo = useSignedS3Url(docKeys.pAPageTwo)?.signedUrl;
  const cPCPageOne = useSignedS3Url(docKeys.cPCPageOne)?.signedUrl;
  const cPCPageTwo = useSignedS3Url(docKeys.cPCPageTwo)?.signedUrl;
  const mEPAPageOne = useSignedS3Url(docKeys.mEPAPageOne)?.signedUrl;
  const mEPAPageTwo = useSignedS3Url(docKeys.mEPAPageTwo)?.signedUrl;
  const pAMI = useSignedS3Url(docKeys.pAMI)?.signedUrl;

  return {
    profile,
    pwdFile,
    vaccinationCert,
    driverLicenseFront,
    driverLicenseBack,
    otherDoc,
    operatorDocs,
    ownerDocs,
    operatorsDoc,
    vehicleOR,
    vehicleCR,
    vehicleSalesInvoice,
    authorizationLetterPageOne,
    authorizationLetterPageTwo,
    sPAPageOne,
    sPAPageTwo,
    pAPageOne,
    pAPageTwo,
    cPCPageOne,
    cPCPageTwo,
    mEPAPageOne,
    mEPAPageTwo,
    pAMI,
  };
}
