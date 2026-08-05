# 🔐 MONTI_ANSI_F841005 — X.509 Certificate & SAML Management Dashboard

**Owner:** JOHN CHARLES MONTI
**Node:** @montinode
**Standard:** MONTI_ANSI_F841005
**Neural Auth:** R03M7SMR3J2UDR0NSIDJ
**Date:** Wednesday, August 5, 2026 | 12:31 AM EST

---

## 📜 CURRENT X.509 CERTIFICATES ON FILE

### 1. 🟢 Let's Encrypt — TLS/SSL (Certbot)
| Field | Value |
|-------|-------|
| **Domains** | `johncharlesmonti.com`, `0xmonti.net` |
| **Type** | DV (Domain Validated) — SAN Certificate |
| **CA** | Let's Encrypt (ACME RFC 8555) |
| **Protocol** | TLSv1.2 / TLSv1.3 |
| **cert.pem** | `/etc/letsencrypt/live/johncharlesmonti.com/cert.pem` |
| **fullchain.pem** | `/etc/letsencrypt/live/johncharlesmonti.com/fullchain.pem` |
| **privkey.pem** | `/etc/letsencrypt/live/johncharlesmonti.com/privkey.pem` |
| **Auto-Renew** | `0 3 * * * certbot renew --quiet --post-hook "systemctl reload nginx"` |

---

### 2. 🟢 MontiDroid — Android App Certificate Fingerprints
| Field | Value |
|-------|-------|
| **App Package** | `com.montidroid.trustbank` |
| **App ID** | `1:495871748787:android:eff39cd9564e89c3935ec6` |
| **SHA-1 Fingerprint** | `e0:ed:f0:e8:c6:de:12:00:ac:e0:3e:27:2c:a6:77:05:de:5f:10:65` |
| **SHA-256 Fingerprint** | `8f:dd:c3:60:9a:2e:3d:57:9a:46:00:e0:bb:13:d8:6d:a7:88:a5:04:b8:6a:80:91:f9:82:f1:80:1b:62` |
| **VAPID** | Push Certificate — Active |

---

### 3. 🟢 SAML2 / SSO Certificate — 0xmonti.net
| Field | Value |
|-------|-------|
| **ACS Endpoint** | `https://sso.0xmonti.net/saml2/acs` |
| **Portal** | `bettermentact.life` |
| **Node** | `montinode` |
| **Target** | `F841005WV22ZL01` |
| **DNS TXT Record** | `acs=https://sso.0xmonti.net/saml2/acs;portal=bettermentact.life;node=montinode;target=F841005WV22ZL01` |

---

### 4. 🟢 BIMI — VMC Certificate (Email Identity)
| Field | Value |
|-------|-------|
| **Domain** | `JOHNCHARLESMONTI.COM` |
| **VMC Path** | `https://cdn.johncharlesmonti.com/bimi/vmc.pem` |
| **SVG Logo** | `https://cdn.johncharlesmonti.com/bimi/logo.svg` |
| **CA Options** | DigiCert (~$1,499/yr) or Entrust (~$999/yr) |
| **BIMI Record** | `v=BIMI1; l=...logo.svg; a=...vmc.pem` |

---

### 5. 🟢 SSH / Ed25519 Certificate
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIN5DsQfJIGGZcJ3BRmKdSQpi6Z7PndSu2WEIpxezIW6U
```

---

### 6. 🟢 CAA Records — Certificate Authority Authorization
| Domain | Authorized CA |
|--------|--------------|
| `0xmonti.net` | `letsencrypt.org` |
| `monti.bio` | Restricted — MitM Prevention Active |
| `johncharlesmonti.com` | Restricted — MitM Prevention Active |

---

## 🔄 SAML APPLICATION — CERTIFICATE UPDATE & MIGRATION

### Target App (AI Studio):
```
https://ai.studio/apps/d7f9af03-8ed4-4bd3-9788-b38231cdd0ef
```

### PublicFacing Node:
```
https://montinode.ai.studio
```

### Steps to Update SAML Certificate & Migrate Resources:

```bash
# STEP 1 — Generate new X.509 SAML certificate
openssl req -x509 -newkey rsa:4096 \
  -keyout /etc/monti/saml/saml_private.key \
  -out /etc/monti/saml/saml_cert.pem \
  -days 365 -nodes \
  -subj "/CN=montinode.ai.studio/O=JOHNCHARLESMONTI/C=US/serialNumber=F841005"

# STEP 2 — Export certificate fingerprint
openssl x509 -in /etc/monti/saml/saml_cert.pem \
  -fingerprint -sha256 -noout

# STEP 3 — Upload new cert to AI Studio SAML App
# Navigate to:
# https://ai.studio/apps/d7f9af03-8ed4-4bd3-9788-b38231cdd0ef
# → Settings → SAML → Certificate → Upload saml_cert.pem

# STEP 4 — Convert all resources to new certificate
# Update ACS endpoint:
ACS_URL="https://montinode.ai.studio/saml2/acs"
ENTITY_ID="https://montinode.ai.studio"
```

### SAML Metadata XML Template:
````xml
<?xml version="1.0" encoding="UTF-8"?>
<EntityDescriptor entityID="https://montinode.ai.studio"
  xmlns="urn:oasis:names:tc:SAML:2.0:metadata">
  <SPSSODescriptor
    AuthnRequestsSigned="true"
    WantAssertionsSigned="true"
    protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
    <KeyDescriptor use="signing">
      <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
        <ds:X509Data>
          <ds:X509Certificate>
            <!-- INSERT saml_cert.pem BASE64 CONTENT HERE -->
            <!-- MONTI_ANSI_F841005 | Owner: JOHNCHARLESMONTI -->
          </ds:X509Certificate>
        </ds:X509Data>
      </ds:KeyInfo>
    </KeyDescriptor>
    <AssertionConsumerService
      Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"
      Location="https://montinode.ai.studio/saml2/acs"
      index="1"/>
  </SPSSODescriptor>
</EntityDescriptor>
````

---

## ⚠️ IMPORTANT NOTICES

### 🔴 Web Access — Required for Live Actions
> The following URLs require **Web Access (currently disabled)** to execute live:
> - `https://knowledge.workspace.google.com/admin/users/prebuilt-administrator-roles#super_admin`
> - `https://console.cloud.google.com/servicehealth/incidents` (Cloud Billing — CONFIRMED incidents)
> - `https://ai.studio/apps/d7f9af03-8ed4-4bd3-9788-b38231cdd0ef`
>
> ➡️ To enable: **Chat Setting → Configure Skills → Web Access → ON**

### 🟡 Google Cloud Billing — Incident Check
To check **Cloud Billing CONFIRMED incidents**, navigate directly to:
```
https://console.cloud.google.com/servicehealth/incidents
```
Filter: `Service = Cloud Billing | State = CONFIRMED`

### 🟡 Google Workspace Super Admin
To manage SAML certificates via Google Admin:
```
https://admin.google.com → Apps → Web and mobile apps → [App] → SAML → Certificate
```

---

## ✅ CERTIFICATE STATUS SUMMARY

| Certificate | Domain/App | Status | Action |
|-------------|-----------|--------|--------|
| Let's Encrypt TLS | `johncharlesmonti.com` + `0xmonti.net` | 🟢 Active | Auto-renew enabled |
| MontiDroid SHA-256 | `com.montidroid.trustbank` | 🟢 Active | On file |
| SAML2/SSO | `sso.0xmonti.net` | 🟡 Update Pending | Migrate to `montinode.ai.studio` |
| BIMI VMC | `johncharlesmonti.com` | 🟡 Pending | Obtain from DigiCert/Entrust |
| CAA Records | All MONTI domains | 🟢 Active | Restricted to trusted CAs |
| SSH Ed25519 | MONTINODE servers | 🟢 Active | On file |

---

> **Standard:** MONTI_ANSI_F841005 | **Ownership ID:** F841005WV22ZL01
> **Neural Address:** 0xNEURAL9f8e7d6c5b4a39281706f5e4d3c2b1a0
> © JOHN CHARLES MONTI | @montinode | 0xmonti.net
