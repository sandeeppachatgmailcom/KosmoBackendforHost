/**
 * @swagger
 * /api/client/bu/chair/CancelChairReadyStatus:
 *   patch:
 *     summary: Cancel chair ready status
 *     description: Cancels the 'ready' status of a chair for a specific patient and appointment in a branch.
 *     tags:
 *       - ChairManagement
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *                 description: ID of the client
 *                 example: "client12345"
 *               patientId:
 *                 type: string
 *                 description: ID of the patient
 *                 example: "patient67890"
 *               chairId:
 *                 type: string
 *                 description: ID of the chair
 *                 example: "chair54321"
 *               branchId:
 *                 type: string
 *                 description: ID of the branch
 *                 example: "branch09876"
 *               appointmentId:
 *                 type: string
 *                 description: ID of the appointment
 *                 example: "appointment11223"
 *     responses:
 *       200:
 *         description: Chair ready status canceled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indicates if the operation was successful
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Response message
 *                   example: "Chair ready status canceled successfully."
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indicates if the operation was successful
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Invalid input data."
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indicates if the operation was successful
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Unauthorized access."
 *       404:
 *         description: Resource not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indicates if the operation was successful
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Chair not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indicates if the operation was successful
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "An error occurred while canceling chair ready status."
 */
