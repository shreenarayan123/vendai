export const dynamic = 'force-dynamic';
import { getUserAppointments } from "@/actions/appointment";
import { getUserClients, getUserPlanInfo } from "@/actions/dashboard";
import DashboardCard from "@/components/dashboard/cards";
import PlanUsage from "@/components/dashboard/plan-usage";
import InfoBar from "@/components/infobar";
import CalIcon from "@/icons/cal-icon";
import PersonIcon from "@/icons/person-icon";

const page = async () => {
  const clients = await getUserClients();
  const plan = await getUserPlanInfo();
  const bookings = await getUserAppointments();
  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full chat-window flex-1 h-0 p-10">
        <div className="flex gap-5 flex-wrap">
          <DashboardCard
            value={clients || 0}
            title="Potential Clients"
            icon={<PersonIcon />}
          />
          <DashboardCard
            value={bookings || 0}
            title="Appointments"
            icon={<CalIcon />}
          />
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 py-10">
          <div>
            <div>
              <h2 className="font-bold text-2xl">Plan Usage</h2>
              <p className="text-sm font-light">
                A detailed overview of your metrics, usage, customers and more
              </p>
            </div>
            <PlanUsage
              plan={plan?.plan!}
              credits={plan?.credits || 0}
              domains={plan?.domains || 0}
              clients={clients || 0}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
