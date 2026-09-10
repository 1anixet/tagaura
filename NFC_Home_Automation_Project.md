# Privacy-First NFC Home & Personal Automation Platform

## 1. Project Overview

### One-line concept

A privacy-first platform that turns physical objects and places into digital actions using NFC, while combining personal automation, family coordination, secure information access, and low-cost smart-home control in one app.

### Simple architecture philosophy

- **NFC tag = physical button/key**
- **Phone app = brain**
- **Server = encrypted synchronization layer**
- **User permissions = decide who can use what**

---

# 2. Problem Statement

Today, different everyday needs are spread across different apps and systems:

- Alarm → Clock
- DND → Phone settings
- Family notes → Notes/messaging apps
- Passwords → Password manager
- Smart home → Separate ecosystem
- Wi-Fi sharing → Settings/QR
- Presence → GPS/location-based systems
- Routines → Automation apps

Users have to manage multiple apps and complicated automation setups.

This project connects the physical world with the digital world through NFC.

Instead of:

`Unlock phone → open app → find feature → press button`

the user can:

`Tap physical NFC tag → app understands the context → action happens`

---

# 3. Core Product Philosophy

The platform has four main pillars:

1. **Physical interaction** — NFC tags/cards placed on real-world objects and locations.
2. **Automation** — One tap can trigger one or multiple actions.
3. **Family connectivity** — Family members can share selected information and statuses.
4. **Privacy** — Minimum permissions, encrypted sensitive data, and end-to-end encrypted family synchronization.

---

# 4. NFC Architecture

The NFC tag should generally NOT contain the application's actual logic.

Example:

```text
TAG_ID = HOME_OUT_001
```

The app/server maps that ID to the configured action.

Example:

```text
HOME_OUT_001
    ↓
Home Entrance
    ↓
IN / OUT
```

### Why use an ID?

If the owner later changes the behavior of a tag, the physical NFC tag does not need to be rewritten.

For example:

```text
Before:
HOME_OUT_001 → Home IN/OUT

After:
HOME_OUT_001 → Leaving Home automation
```

The same physical tag can remain in place.

### Important distinction

#### App-controlled NFC tags

Store an identifier only.

#### Universal NFC tags

For things such as business cards, URLs, or supported Wi-Fi information, standard NDEF data can be stored so compatible phones can potentially use the tag even without the app.

---

# 5. Family System

The app contains a Family concept.

One user creates a family.

## Family Owner

The person who creates the family becomes the Owner.

The Owner can:

- Add members
- Remove members
- Create NFC tags
- Edit NFC tags
- Configure automations
- Set tag permissions
- Edit member permissions
- Change member roles/abilities
- Revoke device access
- Manage family settings

---

# 6. Adding a New Family Member

The app should NOT use a permanent QR code as a family access key.

Instead, use a short-lived, single-use invitation QR.

## Flow

```text
Owner
  ↓
Add New Member
  ↓
Generate Invitation QR
  ↓
QR becomes active
  ↓
Member scans QR
  ↓
Member accepts invitation
  ↓
Server verifies token
  ↓
Member is added
  ↓
QR is consumed
  ↓
QR becomes invalid
```

Example:

```text
QR valid for: 5 minutes
Maximum scans: 1
```

If Mom scans and accepts the invitation, the QR immediately becomes invalid.

If another person tries to scan the same QR:

```text
Invalid / Already Used
```

If the Owner wants to add another member:

```text
Add New Member
    ↓
Generate New QR
```

A completely new invitation token is created.

---

# 7. Invitation QR Security

The QR should NOT contain:

- Family password
- Vault password
- NFC permissions
- Encryption master key
- Sensitive family data

Instead, it should contain/reference a short-lived random invitation token.

Conceptually:

```text
INVITE_TOKEN = random_secret
Family = server-side reference
Expires = short time
Used = false
```

After successful acceptance:

```text
Used = true
```

The token can never be reused.

---

# 8. Family Roles and Permissions

The permission system should remain simple for users.

## Owner

Full family control.

```text
Family settings       ✓
Add members            ✓
Remove members         ✓
Create tags            ✓
Edit tags              ✓
Edit automations       ✓
Edit member access     ✓
Revoke devices         ✓
```

## Normal Member

Example:

```text
Use authorized tags   ✓
Add family notes      ✓
Edit own notes        ✓
Edit family tags      ✗
Manage members        ✗
Family settings       ✗
```

## Custom Permissions

The Owner can allow selected capabilities to selected members.

Example:

```text
Dad

Use Home tags         ✓
Edit selected tags    ✓
Add notes             ✓
Manage members        ✗
Security settings     ✗
```

---

# 9. Owner Security

A normal member should not be able to silently take over the Owner role.

If ownership needs to be transferred:

```text
Transfer Ownership
        ↓
Confirm identity
        ↓
Biometric/PIN
        ↓
New Owner
```

The old Owner becomes a member or another explicitly configured role.

---

# 10. Editing Member Permissions

Owner can later change permissions without changing physical NFC tags.

Example:

```text
Members
  ↓
Dad
  ↓
Permissions
  ↓
HOME_OUT → Allowed
VAULT → Denied
HOME_BOARD → Allowed
```

Save.

The server updates the authorization configuration.

---

# 11. Device Registration and Revocation

A family member's phone should have a registered device identity.

Example:

```text
Aniket
 ├── Current Phone → Authorized
 └── Old Phone     → Revoked
```

If a phone is lost:

```text
Family
  ↓
Member
  ↓
Devices
  ↓
Revoke Old Device
```

The revoked device should no longer be authorized for protected family actions.

---

# 12. Home IN/OUT System

Two NFC tags can be placed at the home entrance:

- HOME IN
- HOME OUT

## Example

User taps HOME OUT.

```text
NFC detected
    ↓
Read TAG_ID
    ↓
Identify logged-in user/device
    ↓
Check authorization
    ↓
Create OUT event
    ↓
Encrypt event
    ↓
Sync with server
    ↓
Family dashboard updates
```

Example dashboard:

```text
HOME STATUS

Aniket    OUT — 9:42 PM
Mom       IN  — 8:17 PM
Dad       IN  — 7:51 PM
```

---

# 13. NFC User Authorization

NFC itself only knows that a tag was tapped.

It does not inherently know which family member performed the tap.

Therefore the app must identify the user through:

- Logged-in account
- Registered device
- Device identity/cryptographic identity
- Server-side authorization

Conceptually:

```text
NFC Tag
   ↓
User identity
   ↓
Device identity
   ↓
Family membership
   ↓
Tag permission
   ↓
Authorized?
```

If unauthorized:

```text
Action rejected
```

---

# 14. GPS-Free Presence

The core IN/OUT feature does NOT require GPS.

The app does not need continuous location tracking to determine whether someone intentionally checked IN or OUT.

### Concept

GPS:

> Where is the user?

NFC:

> What physical place/action is the user intentionally interacting with?

This enables a privacy-focused positioning:

> **Know who's home without tracking where they are.**

---

# 15. Family Home Board

A physical NFC tag can be placed near a home board or common area.

Example:

```text
HOME BOARD NFC
      ↓
Family Board
```

Members can create notes and reminders.

Example:

```text
Mom
"Milk le aana"
Added: 6:30 PM

Dad
"Gas booking karni hai"
Added: 4:10 PM

Aniket
"Odoo submission 6 PM"
```

Possible data:

- Note text
- Author
- Timestamp
- Reminder
- Priority
- Completion status

Permissions determine who can create, edit, or delete shared notes.

---

# 16. Bedside / Sleep NFC

A tag can be placed beside the bed.

Example:

```text
SLEEP NFC
```

Possible actions:

- Turn DND ON
- Set alarm
- Reduce volume
- Reduce brightness where supported
- Turn compatible bedroom smart devices OFF
- Start sleep routine

The user should be able to configure which actions happen.

---

# 17. Study / Focus NFC

A tag can be placed on the study table.

Example:

```text
FOCUS NFC
```

Possible automation:

```text
NFC: FOCUS
    ↓
DND ON
    ↓
50-minute timer
    ↓
Volume 30%
    ↓
Open selected study app
    ↓
Desk light ON (if supported)
```

---

# 18. Automation Builder

The user should eventually be able to create rules in a simple form.

Example:

```text
WHEN
NFC: STUDY

THEN
DND ON
+
Timer 50 minutes
+
Volume 30%
+
Desk Light ON
```

Another:

```text
WHEN
NFC: LEAVING HOME

THEN
Mark OUT
+
Sync family status
+
Lights OFF
+
Fan OFF
```

Another:

```text
WHEN
NFC: SLEEP

THEN
DND ON
+
Alarm 7:00 AM
+
Bedroom Light OFF
+
Volume 0
```

---

# 19. Password Vault

The Vault is a sensitive feature.

The NFC tag should NEVER contain the actual password.

Example:

```text
VAULT NFC
TAG_ID = VAULT_001
```

The actual vault data remains protected inside the application.

## Flow

```text
NFC tap
    ↓
Check authorized user/device
    ↓
Biometric / PIN
    ↓
Unlock encrypted vault
    ↓
Show selected credential
```

Passwords should not be stored as plaintext in the normal database.

---

# 20. Password Copy and Auto-Lock

User can copy a password when needed.

Recommended behavior:

```text
Open Vault
   ↓
Authenticate
   ↓
Copy Password
   ↓
Password enters clipboard
   ↓
Clipboard clears after a short period
```

When the app goes into the background:

```text
App minimized
    ↓
Vault locks
```

When the app is closed:

```text
Vault locked
```

The next access requires authentication again.

### Recommended configurable auto-lock

- Immediately
- 15 seconds
- 30 seconds
- 1 minute

Default:

> Immediately

Additional security measures:

- Hide sensitive content in recent-app previews
- Avoid exposing passwords in notifications
- Use biometric/PIN for sensitive vault access
- Do not store passwords on NFC tags
- Do not store passwords as readable plaintext on the server

---

# 21. Digital Business Card

A business-card NFC tag can contain standard NDEF information.

Possible information:

- Name
- Phone
- Email
- Website
- Address
- Other public contact information

Example:

```text
NFC Business Card
      ↓
Contact Profile
      ↓
Copy / Save / Open Website
```

The app does not need permanent access to the user's Contacts just to display or copy the card information.

If the user chooses to save a contact, the application can use the appropriate Android contact-creation flow.

---

# 22. Wi-Fi NFC

A Wi-Fi NFC tag can be used around the house.

There can be two approaches:

## Universal

Use supported standard NDEF Wi-Fi information.

## App-controlled

The tag stores an ID and the app handles the corresponding configuration/action.

Sensitive Wi-Fi credentials should not be casually exposed on a physically accessible tag.

---

# 23. Smart-Home Integration

The platform can later control low-cost hardware.

Example architecture:

```text
NFC Tag
   ↓
Android App
   ↓
Local Network
   ↓
ESP32 / Compatible Controller
   ↓
Relay / Controller
   ↓
Light / Fan / Appliance
```

The local smart-home path can work without requiring the appliance itself to have a cloud connection, depending on the hardware architecture.

---

# 24. Low-Cost Smart-Home Philosophy

The user should not need to replace the entire house with an expensive proprietary ecosystem.

Possible starting setup:

```text
Existing Android phone
+
NFC tags
```

Then optionally:

```text
+
ESP32
+
Compatible relay/controller
```

Then:

```text
+
More NFC tags
+
More automations
+
More hardware
```

The user can gradually expand the smart-home system.

Positioning:

> **Turn your existing home into a smart home without replacing your entire home.**

---

# 25. Server Architecture

The server exists primarily because family members need synchronization.

Example:

```text
Mom's Phone
     ↓
NFC OUT
     ↓
Create Event
     ↓
Encrypt on device
     ↓
Server
     ↓
Encrypted Data
     ↓
Aniket's Phone
     ↓
Decrypt
     ↓
Dashboard
```

The server can handle:

- Authentication
- Family membership
- Encrypted synchronization
- Permission verification
- Encrypted event storage
- Device management
- Push notifications
- Sync state
- Conflict handling

---

# 26. End-to-End Encryption

The intended security model is:

```text
Phone A
   ↓
Encrypt
   ↓
Server
   ↓
Encrypted payload
   ↓
Phone B
   ↓
Decrypt
```

The server should not need readable access to sensitive family content.

### Important

Do NOT invent custom cryptography.

Use established cryptographic algorithms/protocols and proper key management.

---

# 27. Family Key Management

Because family data is shared, encryption must account for:

- Adding members
- Removing members
- Device registration
- Device revocation
- Permission changes
- Future family data
- Existing encrypted data

Removing a member is not simply deleting a database row.

The encryption architecture must ensure the removed member cannot continue accessing protected future family data.

---

# 28. Offline-Capable Architecture

Using a server does NOT mean every NFC action must require internet.

Personal actions can happen locally.

Example:

```text
NFC
 ↓
Phone
 ↓
Local automation
```

No internet required.

For family synchronization:

```text
NFC
 ↓
Create local event
 ↓
Encrypt
 ↓
Queue for sync
 ↓
Internet available
 ↓
Server sync
```

Therefore the app can be:

> **Offline-capable + cloud-synchronized**

rather than completely cloud-dependent.

---

# 29. Minimum Permissions Philosophy

The app should request only permissions actually needed by enabled features.

### Core

- NFC
- Notifications where required

### Optional, feature-dependent

- Bluetooth/Nearby devices → smart-home/device communication where required
- Camera → QR scanning
- Contacts → only if direct contacts integration is actually implemented

### Core app should NOT require

- Location
- Photos
- Broad file/storage access
- Microphone
- Call logs
- SMS

The application should prefer Android's system pickers when the user needs to select a specific photo/file instead of requesting broad access unnecessarily.

---

# 30. Android System Access

The app can use Android-supported APIs for actions such as:

- NFC
- Notifications
- DND access
- Alarm-related access
- Other supported system integrations

However, Android does NOT give third-party applications unrestricted control over every system setting.

The implementation must use officially supported APIs and appropriate user-granted special access.

---

# 31. Permission Onboarding

Do not request every permission on the first screen.

Instead:

```text
Welcome
  ↓
NFC setup
  ↓
Notifications
  ↓
DND access (if user enables DND automation)
  ↓
Alarm access (if required)
  ↓
Optional smart-home/device permissions
  ↓
Ready
```

Permissions should be requested contextually.

---

# 32. NFC Tag Permission Model

Each tag can have:

```text
Tag ID
Owner
Family
Action
Allowed Users
Allowed Devices
```

Example:

```text
HOME_OUT_001

Action:
IN / OUT

Allowed:
Aniket ✓
Mom    ✓
Dad    ✓
Guest  ✗
```

When a tag is tapped:

```text
Tag valid?
   ↓
Family valid?
   ↓
User authenticated?
   ↓
Device authorized?
   ↓
Permission granted?
   ↓
Execute action
```

---

# 33. Tag Editing

Physical NFC tags should not need to be rewritten for normal application configuration changes.

Example:

```text
Physical Tag
TAG_98372
```

Server/app configuration:

```text
TAG_98372
    ↓
HOME OUT
    ↓
IN / OUT
    ↓
Aniket + Mom + Dad
```

Later:

```text
TAG_98372
    ↓
LEAVING HOME
    ↓
IN/OUT + Lights OFF
```

The physical tag remains the same.

---

# 34. Complete Example Family Setup

Family:

- Mom
- Dad
- Aniket

Tags:

```text
HOME IN
HOME OUT
SLEEP
FOCUS
HOME BOARD
VAULT
WI-FI
LIVING ROOM
```

### Morning

Aniket taps FOCUS:

- DND
- Focus timer
- Desk light

### Mom leaves

Mom taps HOME OUT:

- Mom becomes OUT
- Timestamp recorded
- Encrypted family event synchronized

### Dad arrives

Dad taps HOME IN:

- Dad becomes IN

### Mom adds a note

Mom taps HOME BOARD:

> Milk le aana.

### Aniket accesses password

Aniket taps VAULT:

- Device/user authorization
- Biometric
- Encrypted vault opens
- Password copied
- App goes to background
- Vault locks

### Night

Aniket taps SLEEP:

- DND
- Alarm
- Smart-home actions
- Sleep routine

---

# 35. Product Differentiation

The project should NOT claim that NFC automation itself is new.

Existing platforms already support NFC automation and smart-home workflows.

The differentiation is the combination of:

- Physical-first UX
- Family coordination
- NFC-based presence
- Personal automation
- Secure vault
- Privacy-first permissions
- End-to-end encrypted synchronization
- Low-cost smart-home expansion

### Core product idea

> **Physical places and objects become a simple interface to your personal and family digital life.**

---

# 36. GPS vs NFC

### GPS asks:

> Where is the user?

### NFC asks:

> What physical place/object is the user intentionally interacting with?

GPS can determine that a phone entered a geographical area.

NFC can represent an intentional physical interaction with a specific tag.

This gives the product a privacy-focused presence system without requiring continuous location tracking.

---

# 37. Why This Can Be Simpler Than Traditional Automation

Traditional automation often looks like:

```text
Open app
 ↓
Find automation
 ↓
Select trigger
 ↓
Configure conditions
 ↓
Select actions
 ↓
Run
```

This platform can be:

```text
See physical tag
 ↓
Tap
 ↓
Action
```

The complexity stays mostly inside the initial setup.

The everyday experience remains simple.

---

# 38. Feature Hierarchy

The product should NOT feel like an app with unrelated features.

Recommended hierarchy:

## Core

1. NFC physical automation
2. Family system
3. Family IN/OUT
4. Family notes/reminders
5. Privacy/security
6. Encrypted synchronization

## Supporting features

- Password vault
- Wi-Fi
- Digital business cards
- Alarm/routines
- DND
- Focus mode

## Expansion

- ESP32
- Smart lights
- Fans
- Appliances
- Sensors
- Advanced automation builder

---

# 39. Recommended V1

Do not try to launch every possible feature at once.

A focused V1 should prove the core concept.

### V1

1. User authentication
2. Family creation
3. One-time QR member invitation
4. Member approval
5. Member permissions
6. Device registration
7. Device revocation
8. NFC tag registration
9. NFC tag authorization
10. IN/OUT system
11. Family dashboard
12. Family notes
13. Basic NFC routines
14. Encrypted synchronization
15. Secure vault with biometric protection

### V2

- Smart-home hardware
- ESP32
- Advanced automation builder
- Universal NFC tools
- Wi-Fi NFC
- Business cards
- More Android integrations
- More device integrations

---

# 40. Security Principles

The project should follow these principles:

1. NFC tags should not contain passwords.
2. NFC tags should generally contain identifiers for app-controlled actions.
3. Sensitive data should be encrypted.
4. Server should not receive sensitive family information in readable form where E2E protection applies.
5. QR invitations should be short-lived and single-use.
6. QR codes should not contain permanent family secrets.
7. Device access should be revocable.
8. Member permissions should be server-enforced.
9. Vault access should require strong local authentication.
10. The app should request minimum permissions.
11. Location should not be required for core NFC presence.
12. Custom cryptographic algorithms should never be invented.
13. Android-supported security APIs should be used.

---

# 41. Product Positioning

### 30-second explanation

> We are building a privacy-first platform that turns physical places and objects into digital controls. Instead of opening multiple apps, users can simply tap NFC tags to trigger routines, manage family IN/OUT status, leave shared notes, access protected information, and eventually control low-cost smart-home devices. Family data is synchronized through an end-to-end encrypted architecture, while the app avoids unnecessary permissions such as continuous location tracking or broad access to photos and files.

### Core tagline

> **Tap the physical world. Control your digital home.**

Alternative positioning:

> **A physical interface for your digital life.**

---

# 42. Honest Market Position

The individual technologies are not new:

- NFC automation already exists.
- Smart-home automation already exists.
- Password managers already exist.
- Family notes already exist.
- GPS presence already exists.

The potential differentiation is the product combination and user experience.

The project should therefore NOT be marketed as:

> “We invented NFC automation.”

Instead:

> **We combine physical NFC interaction, family coordination, privacy-focused security, personal automation, and affordable smart-home expansion into one simple platform.**

The goal is not to have the most automation features.

The goal is to make everyday automation feel as simple as:

> **Tap → Action.**

---

# 43. Final Product Philosophy

The entire platform can be summarized as:

```text
                    YOUR PLATFORM
                         |
        +----------------+----------------+
        |                |                |
        ↓                ↓                ↓
  NFC AUTOMATION     FAMILY HOME       PERSONAL
        |                |                |
 Sleep / Focus       IN / OUT          Vault
 Alarm               Notes             Contacts
 DND                 Reminders         Wi-Fi
        |                |                |
        +----------------+----------------+
                         |
                         ↓
                  SMART HOME
                         |
                         ↓
              Low-cost hardware
```

### Core architecture

```text
Physical World
      ↓
    NFC Tag
      ↓
   Android App
      ↓
 ┌────┴──────────────┐
 ↓                   ↓
Local Action      Encrypted Sync
                     ↓
                   Server
                     ↓
              Other Family Devices
```

### Final concept

> **NFC is the physical interface.**
>
> **The phone is the intelligence layer.**
>
> **The server provides encrypted synchronization.**
>
> **Permissions decide who can interact with what.**
>
> **Encryption protects shared sensitive data.**
>
> **Optional hardware turns the same system into a low-cost smart-home platform.**
